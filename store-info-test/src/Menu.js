import React, { useState } from 'react';


const Menu = (props) => {
    const { name, price } = props;
    return(
        <div className="menu-info">
                <p className="menu-name">{name}</p>
                <p className="menu-price">{price}원</p>
        </div>
    );
}

Menu.defaultProps = {
    name: "",
    price: 0
};

export default Menu;
