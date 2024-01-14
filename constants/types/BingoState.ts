interface BingoState {
    cards: Array<BingoCard>;
    currentCard?: BingoCard;
    numbers: Array<BingoNumbers>;
}

interface BingoNumbers {    
    value: number;
    found: boolean;
}

interface BingoCard {
    id: number;
    title: string;
    boxes: BingoBox[];
}

interface BingoBox extends TextAnnotation {
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