import React from 'react';

interface Props {
  selectedRoute: string;
  onSelectRoute: (route: string) => void;
}

export function Sidebar({ selectedRoute, onSelectRoute }: Props) {
  return (
    <div className="sidebar">
      <h2>Polaris Docs</h2>

      <div className="section-title">Auth</div>
      <ul>
        <li
          className={selectedRoute === 'auth/registerUser' ? 'active' : ''}
          onClick={() => onSelectRoute('auth/registerUser')}
        >
          User Registration
        </li>
        <li
          className={selectedRoute === 'auth/registerAdmin' ? 'active' : ''}
          onClick={() => onSelectRoute('auth/registerAdmin')}
        >
          Admin Registration
        </li>
        <li
          className={selectedRoute === 'auth/loginUser' ? 'active' : ''}
          onClick={() => onSelectRoute('auth/loginUser')}
        >
          User Login
        </li>
        <li
          className={selectedRoute === 'auth/refreshToken' ? 'active' : ''}
          onClick={() => onSelectRoute('auth/refreshToken')}
        >
          Refresh Access Token
        </li>
      </ul>

      <div className="section-title">User</div>
      <ul>
        <li
          className={selectedRoute === 'user/listAll' ? 'active' : ''}
          onClick={() => onSelectRoute('user/listAll')}
        >
          List all users
        </li>
        <li
          className={selectedRoute === 'user/getById' ? 'active' : ''}
          onClick={() => onSelectRoute('user/getById')}
        >
          Get one user by ID
        </li>
        <li
          className={selectedRoute === 'user/updateById' ? 'active' : ''}
          onClick={() => onSelectRoute('user/updateById')}
        >
          Update user by ID
        </li>
        <li
          className={selectedRoute === 'user/deleteById' ? 'active' : ''}
          onClick={() => onSelectRoute('user/deleteById')}
        >
          Delete user by ID
        </li>
      </ul>

      <div className="section-title">Products</div>
      <ul>
        <li
          className={selectedRoute === 'product/listAll' ? 'active' : ''}
          onClick={() => onSelectRoute('product/listAll')}
        >
          Get all products
        </li>
        <li
          className={selectedRoute === 'product/createOne' ? 'active' : ''}
          onClick={() => onSelectRoute('product/createOne')}
        >
          Create a new product
        </li>
        <li
          className={selectedRoute === 'product/getById' ? 'active' : ''}
          onClick={() => onSelectRoute('product/getById')}
        >
          Get one product by ID
        </li>
        <li
          className={selectedRoute === 'product/updateById' ? 'active' : ''}
          onClick={() => onSelectRoute('product/updateById')}
        >
          Update an existing product
        </li>
        <li
          className={selectedRoute === 'product/deleteById' ? 'active' : ''}
          onClick={() => onSelectRoute('product/deleteById')}
        >
          Delete a product by ID
        </li>
      </ul>

      <div className="section-title">Cart</div>
      <ul>
        <li
          className={selectedRoute === 'cart/listItems' ? 'active' : ''}
          onClick={() => onSelectRoute('cart/listItems')}
        >
          List all cart items user
        </li>
        <li
          className={selectedRoute === 'cart/addItem' ? 'active' : ''}
          onClick={() => onSelectRoute('cart/addItem')}
        >
          Add an item to cart
        </li>
        <li
          className={selectedRoute === 'cart/removeItem' ? 'active' : ''}
          onClick={() => onSelectRoute('cart/removeItem')}
        >
          Remove item from cart
        </li>
      </ul>
    </div>
  );
}
