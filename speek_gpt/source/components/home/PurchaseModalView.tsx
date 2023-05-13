import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { ModalVisibleContext } from '../../../App';
import PremiumpPlanBox from './modal/PremiumPlanBpx';
import StandardPlanBox from './modal/StandardPlan';

type ModalVisibleContextProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const PurchaseModalView:React.FC = () => {
    const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
    const [isPlanPremium, setIsPlanPremium] = useState<boolean>(true);
    console.log('modalVisible_purchase: ', modalVisible);
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle='formSheet'
        >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Iconify style={{ padding: 15, margin: 10 }} icon={"material-symbols:close"} color={'black'} />
            </TouchableOpacity>
            <View style={styles.container}>
                { isPlanPremium ?
                    <Text style={styles.header}>{`まるでネイティブと\n話しているような没頭感`}</Text>
                    : <Text style={styles.header}>{`いつでもどこでも\nAIと英会話を楽しもう`}</Text>
                }
                { isPlanPremium ?
                    <Text style={styles.comment}>ネイティブ読み上げ機能を使うと、より自然な音声で文章を読み上げます。プランに登録しなくても1000文字まで無料でお試しが可能です！</Text>
                    : <Text style={styles.comment}>{`スタンダードプランでは通常の読み上げモードで30000文字/月での使用が可能になります。プランに登録しなくても2000文字まで無料でお試しが可能です！`}</Text>
                }
                {isPlanPremium ? <PremiumpPlanBox /> : <StandardPlanBox />}
                <TouchableOpacity
                    style={styles.toStandardPlan}
                    onPress={() => setIsPlanPremium(!isPlanPremium)}>
                    { isPlanPremium ? <Text style={{color: '#136FFF'}}>スタンダードプラン</Text> : <Text style={{color: '#FF367F'}}>プレミアムプラン</Text>}
                    <Iconify icon={"ic:sharp-arrow-right"} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.termsOfService}>購読権はiTunesのアカウントで、次の支払い時期の24時間前に購読キャンセルするまで自動的に支払いが行われます。iTunesアカウントの設定に進み、自動支払いの更新を管理できます。購入が完了するとiTunesアカウントでお支払いが行われます。会員登録を行うことで、個人情報保護方針及びサービス条件に同意することとみなされます。</Text>
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
        fontStyle: 'italic',
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
    },
    termsOfService: {
        padding: 30,
        color: '#222222',
    }
});