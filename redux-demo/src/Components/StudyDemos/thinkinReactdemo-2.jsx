/**
 *  @desc 确定最小可变状态集,划分props与state,确定state在哪里
 */
import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
      return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}
  
class ProductRow extends React.Component {
    render() {
      var name = this.props.product.stocked ?
        this.props.product.name :
        <span style={{color: 'red'}}>
          {this.props.product.name}
        </span>;
      return (
        <tr>
          <td>{name}</td>
          <td>{this.props.product.price}</td>
        </tr>
      );
    }
}
  
class ProductTable extends React.Component {
    render() {
      var rows = [];
      var lastCategory = null;
      this.props.products.forEach((product) => {
        if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
          return;
        }
        if (product.category !== lastCategory) {
          rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
}
  
class SearchBar extends React.Component {
    render() {
      return (
        <form>
            {/* {
                [1] input的value值一直等于父组件传来的state
                所以试图键入input框时 react会忽略我的输入
            } */}
          <input type="text" placeholder="Search..." value={this.props.filterText} />
          <p>
            <input type="checkbox" checked={this.props.inStockOnly} />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
}

//[1] 确定公共所有者组件
class FilterableProductTable extends React.Component {
    constructor(props) {
      super(props);
      //[2] 在类构造器里添加实例属性 初始化state
      this.state = {
        filterText: '',//用户输入的搜索文本
        inStockOnly: false//复选框的值
      };
    }
  
    render() {
      return (
        <div>
        {/*{
            [3] 将state做为prop传入需要state的子组件
        } */}
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
          <ProductTable
            products={this.props.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      );
    }
}
  
  
  var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  
//   ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
//   );
  

export {
    FilterableProductTable,
    PRODUCTS
}
  
  