interface BingoState {
    cards: Array<BingoCards>;
}

interface BingoCards {
    id: number;
    title: string;
    boxes: Array<BingoBox>
}

interface BingoBox {
    id: number;
    text: string;
    checked: boolean;
}

interface BingoAction {
    type: string;
    payload: any;
}