import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';

import { getProductDetail } from '../../axios';
import { CheckoutFooter, NotesList, OverlayStatusBar, RadioGroup, SelectableGroup } from '../../components';
import { colors, GLOBAL_KEYS } from '../../constants';
import { ShoppingGraph } from '../../layouts/graphs';

const ProductDetailContent = ({ productId, closeSheet }) => {

    // const { favorites, addToFavorites, removeFromFavorites } = useContext(AppContext);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const favorites = []
    const addToFavorites = () => {
        return 0
    }
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedSugarLevel, setSelectedSugarLevel] = useState('');
    const [selectedIceLevel, setSelectedIceLevel] = useState('');
    const [product, setProduct] = useState(null)
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm


    console.log('productId', productId)
    // const totalPrice = quantity * product.price; // Tính tổng tiền


    const fetchProductDetail = useCallback(async () => {
        try {
            const data = await getProductDetail(productId);
            if (data) {
                setProduct(data); // Lưu danh mục vào state
            }
        } catch (error) {
            console.error("Error fetchProductDetail:", error);
        }
    }, [productId]);

    useEffect(() => {

        fetchProductDetail();

    }, [fetchProductDetail]);
    return (


        product &&

        <>
            {/* <ScrollView style={styles.modalContent}> */}
            <ProductImage hideModal={closeSheet} product={product} />

            <ProductInfo
                favorites={favorites}
                product={product}
                addToFavorites={addToFavorites}
                showFullDescription={showFullDescription}
                toggleDescription={() => { setShowFullDescription(!showFullDescription); }}
            />

            {
                product.variant.length > 0 &&
                <RadioGroup
                    items={product.variant}
                    selectedValue={selectedSize}
                    onValueChange={setSelectedSize}
                    title="Size"
                    required={true}
                    note="Bắt buộc"
                />
            }


            <SelectableGroup
                items={product.topping}
                title='Chọn topping'
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                note="Tối đa 3 toppings"
                activeIconColor={colors.primary}
                activeTextColor={colors.primary}
            />



            <NotesList
                title='Lưu ý cho quán'
                items={notes}
                selectedNotes={selectedNotes}
                onToggleNote={(note) => {
                    if (selectedNotes.includes(note)) {
                        setSelectedNotes(selectedNotes.filter((item) => item !== note));
                    } else {
                        setSelectedNotes([...selectedNotes, note]);
                    }
                }}

                style={{ paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT }}
            />
            {/* </ScrollView> */}

            <CheckoutFooter
                quantity={quantity}
                handlePlus={() => {
                    if (quantity < 10) {
                        setQuantity(quantity + 1)
                    }
                }}
                handleMinus={() => {
                    if (quantity > 1) {
                        setQuantity(quantity - 1)
                    }
                }}
                totalPrice={99000}
                onButtonPress={() => navigation.navigate(ShoppingGraph.CheckoutScreen)}
                buttonTitle='Thêm vào giỏ hàng'
            />
        </>

    );
};

const notes = ['Ít cafe', 'Đậm trà', 'Không kem', 'Nhiều cafe', 'Ít sữa', 'Nhiều sữa', 'Nhiều kem']


const ProductImage = ({ hideModal, product }) => {
    // const [isDialogVisible, setIsDialogVisible] = useState(false);
    // const images = [
    //     {
    //       url: '', 
    //       props: {
    //         source: require('../../assets/images/product1.png'),
    //       },
    //     },
    //   ];
    return (
        <View style={styles.imageContainer}>
            <Pressable
            // onPress={() => setIsDialogVisible(true)}
            >
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}

                />




            </Pressable>
            <IconButton
                icon="close"
                size={GLOBAL_KEYS.ICON_SIZE_SMALL}
                iconColor={colors.primary}
                style={styles.closeButton}
                onPress={hideModal}
            />
            {/* <DialogBasic
          isVisible={isDialogVisible}
          onHide={() => setIsDialogVisible(false)}
          style={styles.height}
        >
          <View style={styles.imageZoomContainer}>
            <ImageViewer imageUrls={images} renderIndicator={() => null}/>
          </View>
        </DialogBasic> */}
        </View>
    );
};

const ProductInfo = ({ product, addToFavorites, showFullDescription, toggleDescription, favorites }) => {
    // Kiểm tra xem sản phẩm có trong mảng favorites không
    const isFavorite = favorites.some(fav => fav._id === product._id); // Hoặc bạn có thể so sánh dựa trên một thuộc tính khác

    return (
        <View style={styles.infoContainer}>

            <View style={styles.horizontalView}>
                <Text
                    style={styles.productName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {product.name}
                </Text>
                <Pressable onPress={() => addToFavorites(product)}>
                    <Icon
                        source={isFavorite ? "heart" : "heart-outline"}  // Nếu sản phẩm trong favorites thì chọn icon "heart"
                        color={isFavorite ? colors.pink500 : colors.gray700}  // Màu sắc tùy thuộc vào trạng thái yêu thích
                        size={GLOBAL_KEYS.ICON_SIZE_DEFAULT}
                    />
                </Pressable>
            </View>

            {/* Product Description */}
            <View style={styles.descriptionContainer}>
                <Text
                    style={styles.descriptionText}
                    numberOfLines={showFullDescription ? undefined : 2}
                    ellipsizeMode="tail">
                    {product.description}
                </Text>
                <Pressable style={styles.textButton} onPress={toggleDescription}>
                    <Text style={styles.textButtonLabel}>
                        {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.overlay,
        flex: 1,
        width: '100%',

    },
    // modalContent: {
    //     width: '100%',
    //     backgroundColor: colors.white,
    //     flexDirection: 'column',
    //     gap: GLOBAL_KEYS.GAP_SMALL,
    //     // marginTop: StatusBar.currentHeight + 40,
    //     flexDirection: 'column',
    //     flex: 1,

    // },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    closeButton: {
        position: 'absolute',
        top: GLOBAL_KEYS.PADDING_DEFAULT,
        right: GLOBAL_KEYS.PADDING_DEFAULT,
        backgroundColor: colors.green100,
    },
    zoomButton: {
        position: 'absolute',
        bottom: GLOBAL_KEYS.PADDING_DEFAULT,
        left: GLOBAL_KEYS.PADDING_DEFAULT,
        backgroundColor: colors.green100,
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: GLOBAL_KEYS.PADDING_SMALL,
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        flex: 1,
        marginRight: 8,
        lineHeight: GLOBAL_KEYS.LIGHT_HEIGHT_DEFAULT,
    },
    descriptionContainer: {
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT
    },
    descriptionText: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
        color: colors.gray700,
        lineHeight: GLOBAL_KEYS.LIGHT_HEIGHT_DEFAULT,
        textAlign: 'justify'
    },
    title: {
        fontWeight: 'bold',
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT
    },
    textButton: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
    },
    redText: {
        color: colors.red800
    },
    textButtonLabel: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
        color: colors.teal900,
    },

    radioGroup: {
        paddingHorizontal: GLOBAL_KEYS.PADDING_SMALL
    },
    toppingList: {
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT,
        gap: GLOBAL_KEYS.GAP_SMALL,
        flexDirection: 'column'
    },
    toppingItem: {
        marginBottom: GLOBAL_KEYS.PADDING_SMALL,
    },
    footer: {
        padding: 16,
        elevation: 5,
        backgroundColor: colors.white
    },
    infoContainer: {
        flexDirection: 'column',
        marginBottom: 8,
    },
    quantityInfoText: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
        color: colors.black,
    },
    totalText: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_TITLE,
        fontWeight: 'bold',
        color: colors.primary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    quantityText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.black,
        marginHorizontal: 8,
    },
    height: {
        height: '100%',
        backgroundColor: '#000'
    },
    imageZoomContainer: {
        height: 800,
    }
});

export default ProductDetailContent