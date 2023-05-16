import React from 'react';
import { StyleSheet, ScrollView, Text, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { Iconify } from 'react-native-iconify';

type TermsOfServiceModalProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const TermsOfSerciveModal: React.FC<TermsOfServiceModalProps> = ({ visible, setVisible }) => {
    const termsOfService = `1. はじめに
    本サービス利用規約（以下「本規約」といいます）は、ユーザーが、私たちが提供するAI英会話アプリ（以下「本アプリ」といいます）の課金サービス（以下「本サービス」といいます）を利用する際の取り決めです。本サービスを利用することで、ユーザーは本規約に同意したものとみなされます。
    
    2. 本サービスの内容
    本サービスでは、ユーザーは定額料金を支払うことで、所定のトークン数を使用することができます。ただし、本サービスを購読していても、使用トークン数を超えた場合、本サービスの利用はできません。
    
    3. サービスの中断・終了
    私たちは、本サービスの内容を予告なく変更、または中断・終了することがあります。これによりユーザーに生じた損失について、私たちは一切の責任を負いません。
    
    4. プライバシー
    私たちは、ユーザーの会話データを第三者に提供、または販売することはありません。
    
    5. お支払い
    本サービスの料金は、Appleのアプリ内課金システムを通じて支払われます。課金、払い戻し、キャンセル等については、Appleの規定に準じます。
    
    6. 免責事項
    私たちは、本サービスの完全性、正確性、確実性、有用性等について一切保証しません。ユーザーが本サービスを利用した結果について、私たちは一切の責任を負いません。

    7. 改訂
    私たちは、本規約を任意の理由でいつでも変更することができます。変更後の規約は、本アプリまたは関連するウェブサイト上で公開され、その時点から効力を生じます。本サービスを継続して利用することで、ユーザーは変更後の規約に同意したものとみなされます。

    8. 適用法および管轄
    本規約および本サービスの利用には、日本国の法律が適用されます。また、本規約または本サービスに関連する全ての紛争については、日本国の裁判所が専属的な管轄権を有するものとします。
    `;
    return (
        <Modal
            animationType="slide"
            visible={visible}
            presentationStyle='fullScreen'
        >
            <SafeAreaView>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
                <Iconify style={{ padding: 15, margin: 10 }} icon={"material-symbols:close"} color={'black'} />
            </TouchableOpacity>
            </SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.termsofservice}>{termsOfService}</Text>
            </ScrollView>
        </Modal>
    );
};

export default TermsOfSerciveModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    termsofservice: {
        padding: 10,
    },
});