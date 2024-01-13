interface BingoState {
    cards: Array<BingoCard>;
    currentCard?: BingoCard;
}

interface BingoCard {
    id: number;
    title: string;
    boxes: TextAnnotation[];
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

type BingoContextType = {
    state: BingoState;
    dispatch: React.Dispatch<BingoAction>;
  };