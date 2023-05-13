import React, { useContext, useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { ModalVisibleContext } from '../ConversationList';
import PremiumpPlanBox from './modal/PremiumPlanBpx';
import StandardPlanBox from './modal/StandardPlan';
const PurchaseModalView = () => {
    const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
    const [isPlanPremium, setIsPlanPremium] = useState<boolean>(true);
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle='formSheet'
        >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Iconify style={{ padding: 15, margin: 10 }} icon={"material-symbols:close"} color={'black'} />
            </TouchableOpacity>
            <View style={styles.container}>
                { isPlanPremium ?
                    <Text style={styles.header}>{`まるでネイティブと\n話しているような没頭感`}</Text>
                    : <Text style={styles.header}>{`スタンダードプランで\nAIと英会話を楽しもう`}</Text>
                }
                { isPlanPremium ?
                    <Text style={styles.comment}>ネイティブ読み上げ機能を使うと、より自然な音声で文章を読み上げます。プランに登録しなくても200文字まで無料でお試しが可能です！</Text>
                    : <Text style={styles.comment}>{`スタンダードプランでは3000文字/月での使用が可能になります。プランに登録しなくても300文字まで無料でお試しが可能です！`}</Text>
                }
                {isPlanPremium ? <PremiumpPlanBox /> : <StandardPlanBox />}
                <TouchableOpacity
                    style={styles.toStandardPlan}
                    onPress={() => setIsPlanPremium(!isPlanPremium)}>
                    { isPlanPremium ? <Text>スタンダードプラン</Text> : <Text>プレミアムプラン</Text>}
                    <Iconify icon={"ic:sharp-arrow-right"} color={'black'} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
export default PurchaseModalView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: 'bold',
        // marginBottom: '5%',
    },
    comment: {
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: '5%',
    },
    toStandardPlan: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    }
});