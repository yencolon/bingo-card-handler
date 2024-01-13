import { StyleSheet } from 'react-native';
import { View, Text } from "../Themed";

export type BingoCardComponentProps = {
    cardSymbols: TextAnnotation[]
}

export default function BingoCardComponent(props: BingoCardComponentProps) {

    const matrixJSX = props.cardSymbols.map((obj, index) => (
        <View key={index} style={styles.bingoBox}>
            <Text style={{ margin: 5 }}>{obj.description}</Text>
        </View>
    ));

    return (
        <View style={styles.bingoCardContainer}>
            {matrixJSX}
        </View>
    )
}

const styles = StyleSheet.create({
    bingoCardContainer: {   
        flex: 1,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        width: '80%',
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    bingoBox: {
        width: "20%", 
        height: "20%",
        borderColor: 'white',
        borderWidth: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }
})