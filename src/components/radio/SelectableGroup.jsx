import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GLOBAL_KEYS, colors } from '../../constants';
import { Selectable } from './Selectable';
import PropTypes from 'prop-types';




const SelectableGroupPropTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
    selectedGroup: PropTypes.array.isRequired,
    setSelectedGroup: PropTypes.func.isRequired,
    required: PropTypes.bool,
    note: PropTypes.string,
    activeIconColor: PropTypes.string,
    activeTextColor: PropTypes.string
};

export const SelectableGroup = ({
    items,
    title = "Default title",
    selectedGroup,
    setSelectedGroup,
    required = false,
    note,
    activeIconColor = colors.primary,
    activeTextColor = colors.primary
}) => {

    return (
        <View style={styles.container}>
            {
                items.length > 0 &&
                <>
                    <Text style={styles.title}>
                        {title}
                        {required && <Text style={styles.redText}>*</Text>}
                        {note && <Text style={styles.note}> ({note})</Text>}
                    </Text>
                    {items.map(item => {
                        return (
                            <Selectable
                                item={item}
                                quantity={selectedGroup.find(selectedItem => selectedItem._id === item._id)?.quantity || 0}
                                selected={selectedGroup.some(selectedItem => selectedItem._id === item._id)}
                                handlePlus={(item) => handlePlus(item, selectedGroup, setSelectedGroup)}
                                handleMinus={(item) => handleMinus(item, selectedGroup, setSelectedGroup)}
                                activeIconColor={activeIconColor}
                                activeTextColor={activeTextColor}
                                key={item._id}
                            />
                        );
                    })}
                </>
            }

        </View>
    );
};

SelectableGroup.propTypes = SelectableGroupPropTypes;




// Hàm xử lý tăng số lượng
const handlePlus = (itemToPlus, selectedGroup, setSelectedGroup) => {
    const existingItem = selectedGroup.find(item => item._id === itemToPlus._id);

    if (existingItem) {
        // Nếu item đã tồn tại, chỉ cập nhật quantity
        setSelectedGroup(prevGroup =>
            prevGroup.map(item =>
                item._id === itemToPlus._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    } else if (selectedGroup.length < 3) {
        // Nếu chưa đủ 3 items, có thể thêm mới
        setSelectedGroup(prevGroup => [...prevGroup, { ...itemToPlus, quantity: 1 }]);
    }
};


// Hàm xử lý giảm số lượng
const handleMinus = (itemToMinus, selectedGroup, setSelectedGroup) => {
    const existingItem = selectedGroup.find(item => item._id === itemToMinus._id);

    if (existingItem && existingItem.quantity > 1) {
        setSelectedGroup(prevGroup =>
            prevGroup.map(item =>
                item._id === itemToMinus._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    } else {
        setSelectedGroup(prevGroup => prevGroup.filter(item => item._id !== itemToMinus._id));
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: GLOBAL_KEYS.PADDING_DEFAULT
    },
    title: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_TITLE,
        fontWeight: 'bold',
        marginBottom: GLOBAL_KEYS.PADDING_SMALL,
    },
    redText: {
        color: colors.red800,
    },
    note: {
        fontSize: GLOBAL_KEYS.TEXT_SIZE_DEFAULT,
        fontWeight: '400',
    }
});


