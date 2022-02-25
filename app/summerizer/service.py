from transformers import pipeline,RobertaTokenizerFast, EncoderDecoderModel
from bs4 import BeautifulSoup
from summarizer import Summarizer,TransformerSummarizer
import requests
import validators
from PyPDF2 import PdfFileReader
from app.settings import  MEDIA_ROOT
import zipfile, re
import os
from django.core.cache import cache
import hashlib


GPT2_model = TransformerSummarizer(transformer_type="GPT2",transformer_model_key="gpt2")
class SummarizerModel(object):
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'



    def generate_summary(self,text, sent_length, filename):
        result = ""
        if sent_length > 0:
            result = ''.join(GPT2_model(text, min_length=60, num_sentences = sent_length))
        elif sent_length<=0:
            result = ''.join(GPT2_model(text, min_length=60))
        hash_object = hashlib.sha256(str(filename).encode('utf-8'))
        hashedFileName = hash_object.hexdigest()
        cache.set(hashedFileName,result)
        return result


    def extractDocument(self, filename):
        """Check if filename is word or pdf """
        filepath = MEDIA_ROOT+'/'+filename
        if filename.lower().endswith('.pdf'):
            filereader = open(filepath, 'rb')
            pdfReader = PdfFileReader(filereader)
            pdftext = ""
            for page in range(pdfReader.numPages):
                pageObj = pdfReader.getPage(page)
                pdftext += pageObj.extractText().replace('\n','')
            cleaned = re.sub('<(.|\n\r\n)*?>','',pdftext)
            os.remove(filepath)
            filereader.close()
            return cleaned
         




        elif filename.lower().endswith('.docx'):
                filepath = MEDIA_ROOT+'/'+filename
                docx = zipfile.ZipFile(filepath)
                content = docx.read('word/document.xml').decode('utf-8')
                cleaned = re.sub('<(.|\n\r\n)*?>','',content)
                os.remove(filepath)
                return cleaned


    def summarizeDocument(self,filename, length):
        sent_length = int(length)
        text = ""
        body = self.extractDocument(filename)
        text = self.generate_summary(body,sent_length,filename)
        return text

    def summarizeArticle(self, articleUrl,length):
        URL = articleUrl
        sent_length = int(length)
        text = ""
        if validators.url(URL):
            r = requests.get(URL)
            soup = BeautifulSoup(r.text, 'html.parser')
            results = soup.find_all(['h1', 'p'])
            text = [result.text for result in results]
            article = text if URL == "" else ''.join(text)
            text = self.generate_summary(article,sent_length,URL)

        return text
