import React,{useState} from 'react';
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
import { TextFormatter } from '../../utils';

const width = Dimensions.get('window').width;

export const  ProductsListVertical = props => {
  const {onItemClick} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Món Mới Phải Thử</Text>
      <FlatList
        data={productsNewDish}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ItemProduct item={item} onItemClick={onItemClick} />
        )}
        contentContainerStyle={styles.flatListContentContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const ItemProduct = ({item, onItemClick}) => {
   const [modalVisible, setModalVisible] = useState(false);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
  
    const formatCurrencyVND = amount => {
      return amount.toLocaleString('vi-VN') + 'đ';
    };
  
    const toppings = [
      {id: 1, name: 'Kem Phô Mai Macchiato', price: 12000},
      {id: 2, name: 'Shot Espresso', price: 15000},
      {id: 3, name: 'Trái Vải', price: 10000},
      {id: 4, name: 'Hạt Sen', price: 10000},
      {id: 5, name: 'Sốt Caramel', price: 12000},
      {id: 6, name: 'Trân châu trắng', price: 8000},
      {id: 7, name: 'Foam Phô Mai', price: 15000},
      {id: 8, name: 'Thạch Cà Phê', price: 9000},
      {id: 9, name: 'Đào Miếng', price: 10000},
    ];
  
  toggleTopping = topping => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else if (selectedToppings.length < 2) {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };
  
  
    const totalPrice =
      (item.price +
        selectedToppings.reduce((sum, topping) => sum + topping.price, 0)) *
      quantity;
  return (
    <View style={styles.itemProduct}>
      <TouchableOpacity onPress={() => onItemClick()}>
        <Image source={item.image} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatCurrencyVND(item.price)}</Text>
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
      {/* Modal Topping */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.toppingTitleContainer}>
              <Text style={styles.modalTitle}>{item.name}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon source="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Topping (Chọn tối đa 2 loại)
            </Text>
            <FlatList
              data={toppings}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.toppingRow}>
                  <Checkbox
                    status={
                      selectedToppings.some(t => t.name === item.name)
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => toggleTopping(item)}
                    color={colors.primary}
                  />
                  <Text style={styles.toppingText}>{item.name}</Text>
                  <Text style={styles.priceText}>
                    {formatCurrencyVND(item.price)}
                  </Text>
                </View>
              )}
            />

            <View style={styles.toppingRow}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  style={styles.quantityButton}>
                  <Icon
                    source={'minus'}
                    color={colors.primary}
                    size={GLOBAL_KEYS.ICON_SIZE_DEFAULT}
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}>
                  <Icon
                    source={'plus'}
                    color={colors.primary}
                    size={GLOBAL_KEYS.ICON_SIZE_DEFAULT}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmText}>
                  {formatCurrencyVND(totalPrice)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const productsNewDish = [
  {
    id: '1',
    name: 'Combo 2 Trà Sữa Trân Châu Hoàng Kim',
    image: require('../../assets/images/imgae_product_combo/image_combo_2_milk_tea.png'),
    price: 69000,
  },
  {
    id: '2',
    name: 'Combo 3 Olong Tea',
    image: require('../../assets/images/imgae_product_combo/image_combo_3_milk_tea.png'),
    price: 79000,
  },
  {
    id: '3',
    name: 'Combo 2 Trà Sữa Trân Châu Hoàng Kim',
    image: require('../../assets/images/imgae_product_combo/image_combo_2_milk_tea.png'),
    price: 69000,
  },
  {
    id: '4',
    name: 'Combo 3 Olong Tea',
    image: require('../../assets/images/imgae_product_combo/image_combo_3_milk_tea.png'),
    price: 79000,
  },
];

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
  modalSubtitle: {fontSize: 14, color: 'gray', marginBottom: 10},
  toppingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GLOBAL_KEYS.PADDING_SMALL,
  },
  toppingText: {flex: 1, marginLeft: 10},
  priceText: {color: 'gray'},
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
  quantityText: {fontSize: 16, fontWeight: 'bold'},
  confirmButton: {
    flex: 3,
    backgroundColor: colors.primary,
    padding: GLOBAL_KEYS.PADDING_DEFAULT,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmText: {fontSize: 16, fontWeight: 'bold', color: 'white'},
  toppingTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 1,
  },
});


