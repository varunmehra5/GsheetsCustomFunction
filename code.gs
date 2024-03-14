/**
 * Custom function to classify text in a given range as SPAM or NOT SPAM.
 * @customfunction
 */


// Name of the Function
function GENAI_SPAMCLASS(dataRange) {
      // Validate the input data range
  if (!dataRange || dataRange.length === 0) {
    return [["Invalid data range"]];
  }
  const objective = "Classify whether the text is SPAM or NOT SPAM."; // Replace the objective here if you want
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?";
  const apiKey = "YOUR_GEMINI_API_KEY";
  let results = [];
    // Process each row of the data range
  dataRange.forEach((row) => {
    let prompt = createPrompt(objective, [row]);
    results.push([fetchAPIResponse(prompt, url, apiKey)]);
  });
  return results;
}


// Helper function to create a prompt based on the objective and data range
function createPrompt(objective, dataRange) {
  let prompt = `Objective: ${objective}\n\n`;
  dataRange.forEach((row) => {
    row.forEach((cell, cellIdx) => {
      prompt += `Data ${cellIdx + 1}: ${cell}\n`;
    });
    prompt += '\n';
  });
  return prompt;
}


// Function to make API call and fetch the response
function fetchAPIResponse(prompt, url, apiKey) {
  let fullUrl = `${url}key=${apiKey}`;
  let requestBody = { contents: [{ parts: [{ text: prompt }] }] };
  let options = { method: 'post', contentType: 'application/json', payload: JSON.stringify(requestBody), muteHttpExceptions: true };
  let response = UrlFetchApp.fetch(fullUrl, options);
  let responseCode = response.getResponseCode();
  let responseContent = response.getContentText();
  console.log("Response Code:", responseCode);
  console.log("Response Content:", responseContent);

  if (responseCode == 200) {
    let jsonResponse = JSON.parse(responseContent);
    return jsonResponse.candidates && jsonResponse.candidates.length > 0 ? jsonResponse.candidates[0].content.parts.map(part => part.text).join(' ') : "No valid content generated";
  } else {
    console.log(`[ERROR] API call failed with status code: ${responseCode}`);
    return "API call failed";
  }
}
