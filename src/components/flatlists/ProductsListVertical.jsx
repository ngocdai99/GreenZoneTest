import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { Icon, Checkbox } from 'react-native-paper';
import { GLOBAL_KEYS, colors } from '../../constants';
import ToppingModal from '../modal/ToppingModal';
import { TextFormatter } from '../../utils';

const width = Dimensions.get('window').width;

export const ProductsListVertical = ({
  onItemClick,
  toppings,
  products
}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Món Mới Phải Thử</Text>
      <FlatList
        data={products}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <ItemProduct item={item} onItemClick={onItemClick} toppings={toppings} />
        )}
        contentContainerStyle={styles.flatListContentContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const ItemProduct = ({ item, onItemClick, toppings }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.itemProduct}>
      <TouchableOpacity onPress={onItemClick}>
        <Image source={{ uri: String(item.image) }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {TextFormatter.formatCurrency(item.originalPrice)}
          {/* {item.originalPrice.toLocaleString('vi-VN')}đ */}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}>
        <Icon
          source="plus"
          size={GLOBAL_KEYS.ICON_SIZE_DEFAULT}
          color={colors.white}
        />
      </TouchableOpacity>
      <ToppingModal
        toppings={toppings}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        item={item}
        onConfirm={(selectedToppings, quantity) => {
          console.log('Selected toppings:', selectedToppings);
          console.log('Quantity:', quantity);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: GLOBAL_KEYS.GAP_DEFAULT,
    gap: GLOBAL_KEYS.GAP_DEFAULT,
  },
  title: {
    fontSize: GLOBAL_KEYS.TEXT_SIZE_TITLE,
    fontWeight: '500',
    color: colors.black,
  },

  flatListContentContainer: {
    gap: GLOBAL_KEYS.GAP_DEFAULT,
  },
  itemProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemImage: {
    width: width / 4.5,
    height: width / 4.5,
    borderRadius: GLOBAL_KEYS.BORDER_RADIUS_DEFAULT,
  },
  productInfo: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: GLOBAL_KEYS.PADDING_DEFAULT,
  },
  productName: {
    fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
    fontWeight: '500',
  },
  productPrice: {
    marginTop: GLOBAL_KEYS.PADDING_SMALL,
    fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
    color: colors.red900,
  },
  addButton: {
    borderRadius: GLOBAL_KEYS.BORDER_RADIUS_DEFAULT,
    backgroundColor: colors.primary,
    position: 'absolute',
    end: 0,
    bottom: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: { fontSize: 14, color: 'gray', marginBottom: 10 },
  toppingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GLOBAL_KEYS.PADDING_SMALL,
  },
  toppingText: { flex: 1, marginLeft: 10 },
  priceText: { color: 'gray' },
  quantityContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: GLOBAL_KEYS.PADDING_DEFAULT,
  },
  quantityButton: {
    padding: 12,
    backgroundColor: colors.green200,
    borderRadius: 999,
    marginHorizontal: GLOBAL_KEYS.PADDING_DEFAULT,
  },
  quantityText: { fontSize: 16, fontWeight: 'bold' },
  confirmButton: {
    flex: 3,
    backgroundColor: colors.primary,
    padding: GLOBAL_KEYS.PADDING_DEFAULT,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  toppingTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 1,
  },
});


