import React from "react";
// quantity start
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
export const ProductQuantity = ({ product, productCount, setProductCount }) => {
  productCount = productCount[product.id] || 1;
  return (
    <div >
      <Badge color="secondary" badgeContent={productCount}>
        <ShoppingCartIcon />
      </Badge>
      <ButtonGroup>
        <Button
          onClick={() => {
            setProductCount({
              ...productCount,
              [product.id]: Math.max(productCount - 1, 1),
            });
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Button
          onClick={() => {
            setProductCount({
              ...productCount,
              [product.id]: Math.max(productCount + 1),
            });
          }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
};
