# Google Sheets Custom Function for SPAM Classification

This Google Sheets script provides a custom function, `GENAI_SPAMCLASS`, to classify text as SPAM or NOT SPAM using the Gemini language model.

## Setup

1. Replace `YOUR_GEMINI_API_KEY` with your actual API key.
2. Add this script to your Google Sheets' script editor.
3. Use the function `=GENAI_SPAMCLASS(range)` in your sheets, where `range` is the range of cells containing text to classify.

## Usage

- `=GENAI_SPAMCLASS(A1:A10)` - This will classify each cell in the range A1:A10 and return the results in the corresponding cells.
