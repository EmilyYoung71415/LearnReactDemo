/**
 *  @desc 添加反向数据流
 *   双向的实现
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
      console.log(this.props.inStockOnly)
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
    constructor(props) {
      super(props);
      this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
      this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }
    
    handleFilterTextInputChange(e) {
      this.props.onFilterTextInput(e.target.value);
    }
    
    handleInStockInputChange(e) {
      this.props.onInStockInput(e.target.checked);
    }
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextInputChange}
          />
          <p>
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
             // {[3] 表单的onChange事件调用父组件传来的回调函数 ,父组件的回调函数调用 setState(),更新state}
             //由此实现反向数据流
              onChange={this.handleInStockInputChange}
            />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
  }
  
  class FilterableProductTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false
      };
      
      this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
      this.handleInStockInput = this.handleInStockInput.bind(this);
    }
  
    handleFilterTextInput(filterText) {
      this.setState({
        filterText: filterText
      });
    }
    
    handleInStockInput(inStockOnly) {
        //[2]每次应当更新状态时,自动触发
      this.setState({
        inStockOnly: inStockOnly
      })
    }
  
    render() {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextInput={this.handleFilterTextInput}
            // {[1] 传递一个回调函数给SearchBar}
            onInStockInput={this.handleInStockInput}
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