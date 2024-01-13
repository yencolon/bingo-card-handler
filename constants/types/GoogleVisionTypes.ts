interface BoundingPoly {
    vertices: { x: number; y: number }[];
}

interface TextAnnotation {
    locale: string,
    description: string;
    boundingPoly: BoundingPoly;
}

interface VisionApiResponse {
    responses: {
        textAnnotations: TextAnnotation[];
    }[];
}