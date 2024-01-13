function readImageText(imageBase64: string | undefined): Promise<VisionApiResponse | undefined> {
    console.log('getInfoFromImage Fucntion');
    const apiKey = process.env.EXPO_PUBLIC__GOOGLE_VISION_API_KEY;
    let apiResponse: VisionApiResponse | undefined;
    const body = {
        requests: [
            {
                image: {
                    content: imageBase64,
                },
                features: [
                    {
                        type: 'DOCUMENT_TEXT_DETECTION',
                    },
                ],
            },
        ],
    };
    console.log('url: ', `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`);
    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((response) => {
            // transform response to VisionApiResponse
            console.log("response" + response);
            apiResponse = response.responses[0];
            return Promise.resolve(apiResponse);
        })
        .catch((error) => {
            console.log('Error: ', error);
            return Promise.resolve(apiResponse);
        })
}


export const GoogleVisionApi = {
    readImageText,
};