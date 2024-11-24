# AI Data Extraction (How It Works)

## Excel File Handling

- Upload: Users upload an Excel file in .xlsx format.
- Parsing with ExcelJS:
The file is read and parsed using the ExcelJS library. <br>
Each row of the first worksheet is extracted into an array of objects, with rows containing column names and their corresponding values.
If the file contains more than 40(defined in code) rows, the system processes it in batches of 40 rows to prevent memory issues(as the free ai model has its limits) or crashes.
- Data Preparation:
The extracted data is formatted into JSON.
For each batch, a custom prompt is created to send to the Google Generative AI model.
The formatted data is sent to the Gemini AI API with a structured prompt like:
```
Process this Excel data: <JSON-formatted rows>
```
AI processes the content to extract insights, summarize data, or validate fields as needed.
- Display:
The AI-enhanced data is returned and displayed in a table, highlighting missing or incomplete fields for user review.

## PDF File Handling

- Upload: Users upload a PDF file.
File Upload to Gemini API:
The PDF is directly uploaded to the Gemini API using the GoogleAIFileManager.
The file is identified by its MIME type: application/pdf.
- AI Analysis:
The AI model extracts textual content from the PDF and processes it based on the provided prompt. For example:
```
Summarize the content of this PDF file: <file-uri>
```
- Display:
The summarized or extracted content is returned as a response.
The processed text is displayed in a structured format or added to a table for further review.

## Image File Handling

- Upload: Users upload an image file.
- File Upload to Gemini API:
The image is uploaded to the Gemini API and identified by its MIME type (e.g., image/png, image/jpeg).
- AI Analysis:
Gemini AI uses optical character recognition (OCR) to extract textual content from the image.
Additional AI capabilities process the content to summarize or validate it. A sample prompt might be:
```
Extract and summarize text from this image: <file-uri>
```
- Display:
The extracted text is returned as a structured response and displayed in the table for user validation.
