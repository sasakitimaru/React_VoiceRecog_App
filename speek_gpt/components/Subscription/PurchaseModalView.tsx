import React, { useContext, useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, Linking, ScrollView } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { ModalVisibleContext } from '../../App';
import PremiumpPlanBox from './components/PremiumPlanBpx';
import StandardPlanBox from './components/StandardPlanBox';
import TermsOfSerciveModal from './TermsOfServiceModal';
import { deepLinkToSubscriptionsIos } from 'react-native-iap';

type ModalVisibleContextProps = {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const PurchaseModalView: React.FC = () => {
    const { modalVisible, setModalVisible } = useContext<ModalVisibleContextProps>(ModalVisibleContext);
    const [isPlanPremium, setIsPlanPremium] = useState<boolean>(true);
    const [termsvisible, setTermsVisible] = useState<boolean>(false);

    const handlecancelSubscriptions = async () => {
        deepLinkToSubscriptionsIos();
    };

    const handleEULA = () => {
        Linking.openURL('https://sasakitimaru.github.io/React_VoiceRecog_App/EULA');
    };
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle='formSheet'
        >
            <ScrollView>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Iconify style={{ padding: 15, margin: 10 }} icon={"material-symbols:close"} color={'black'} />
                </TouchableOpacity>
                <View style={styles.container}>
                    {isPlanPremium ?
                        <Text style={styles.header}>{`ほぼネイティブスピーカーの\n発音で英会話をする`}</Text>
                        : <Text style={styles.header}>{`いつでもあなたのそばにいます。\nAIと英会話を楽しもう。`}</Text>
                    }
                    {isPlanPremium ?
                        <Text style={styles.comment}>ネイティブ読み上げ機能を使うと、より自然な音声で文章を読み上げます。プレミアムプランならネイティブ読み上げを30000文字/月、通常読み上げを50000文字/月まで使用できます</Text>
                        : <Text style={styles.comment}>{`スタンダードプランでは通常の読み上げモードで30000文字/月での使用が可能になります。スタンダードプランならネイティブ読み上げを1000文字/月、通常読み上げを50000文字/月まで使用できます`}</Text>
                    }
                    {isPlanPremium ? <PremiumpPlanBox /> : <StandardPlanBox />}
                    <TouchableOpacity
                        style={styles.toStandardPlan}
                        onPress={() => setIsPlanPremium(!isPlanPremium)}>
                        {isPlanPremium ? <Text style={{ color: '#136FFF' }}>スタンダードプラン</Text> : <Text style={{ color: '#FF367F' }}>プレミアムプラン</Text>}
                        <Iconify icon={"ic:sharp-arrow-right"} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.termsOfService}>購読権はiTunesのアカウントで、次の支払い時期の24時間前に購読キャンセルするまで自動的に支払いが行われます。iTunesアカウントの設定に進み、自動支払いの更新を管理できます。購入が完了するとiTunesアカウントでお支払いが行われます。会員登録を行うことで、個人情報保護方針及びサービス条件に同意することとみなされます。</Text>
                    {/* <TouchableOpacity
                    onPress={() => { setTermsVisible(true); }}
                >
                    <Text style={styles.termsOfSerciveLink}>利用規約</Text>
                </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={handleEULA}
                    >
                        <Text style={styles.termsOfSerciveLink}>利用規約/プライバシーポリシー</Text>
                    </TouchableOpacity>
                    <TermsOfSerciveModal visible={termsvisible} setVisible={setTermsVisible} />
                    <TouchableOpacity
                        onPress={handlecancelSubscriptions}
                    >
                        <Text style={styles.cancellation}>解約</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        fontSize: 25,
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
    },
    termsOfSerciveLink: {
        marginTop: 10,
        color: '#136FFF',
    },
    cancellation: {
        marginTop: 20,
        color: '#FF367F',
    }
});