function readImageText(imageBase64: string | undefined) {
    console.log('getInfoFromImage');
    if (!imageBase64) {
        return;
    }
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

    fetch('https://vision.googleapis.com/v1/images:annotate?key=', {
        method: 'POST',
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((response) => {
            // transform response to VisionApiResponse
            console.log(response);
            return response as VisionApiResponse;
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
}


export const GoogleVisionApi = {
    readImageText,
};