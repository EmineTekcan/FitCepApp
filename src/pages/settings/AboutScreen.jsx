import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>FitCep</Text>
        <Text style={styles.text}>Açıklama: FitCep, spor yapmaya motive etmek ve sağlıklı yaşam alışkanlıkları edinmenize yardımcı olmak amacıyla geliştirilmiş bir mobil uygulamadır. Kullanıcı dostu arayüzü ve zengin özellikleriyle FitCep, spor yapma deneyiminizi daha eğlenceli ve etkili hale getirir. FitCep ile her gün daha aktif bir yaşam sürmek ve sağlıklı alışkanlıklar edinmek artık daha kolay ve erişilebilir.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Misyon Beyanı</Text>
        <Text style={styles.text}>FitCep olarak misyonumuz, insanların sağlıklı yaşam tarzlarını benimsemelerine ve düzenli olarak spor yapmalarına teşvik etmektir. İnsanların yaşam kalitesini artırmak, fiziksel ve zihinsel sağlıklarını desteklemek ve mutlu, dengeli bir yaşam sürmelerini sağlamak için uygulamamızı sürekli olarak geliştirmeye ve yenilikçi çözümler sunmaya kararlıyız. FitCep, herkesin daha iyi bir kendiliğine ulaşabileceği bir platform olmayı hedeflemektedir.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Geliştirici Bilgileri</Text>
        <Text style={styles.text}>Adü Team Turtle</Text>
        <Text style={styles.text}>Versiyon Numarası: 1.0.0</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Destek Maili</Text>
        <Text style={styles.text}>fthbck0@gmail.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AboutScreen;