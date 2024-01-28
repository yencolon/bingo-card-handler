export default function hasBingo(card: BingoCard): boolean {
    const rows = 5;
    const cols = 5;

    // Check rows
    for (let i = 0; i < rows; i++) {
        if (checkLine(card.boxes.slice(i * cols, (i + 1) * cols))) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < cols; i++) {
        const column = [];
        for (let j = 0; j < rows; j++) {
            column.push(card.boxes[j * cols + i]);
        }
        if (checkLine(column)) {
            return true;
        }
    }

    // Check diagonals
    const diagonal1 = [card.boxes[0], card.boxes[4], card.boxes[8]];
    const diagonal2 = [card.boxes[2], card.boxes[4], card.boxes[6]];

    if (checkLine(diagonal1) || checkLine(diagonal2)) {
        return true;
    }

    return false;
}

function checkLine(line: BingoBox[]): boolean {
    return line.every(box => box.checked);
}
