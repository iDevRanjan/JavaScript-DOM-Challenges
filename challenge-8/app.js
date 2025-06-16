const cartItems = document.getElementById("cart-items");
const emptyCart = cartItems.querySelector(".empty-cart");
const cartTotal = document.getElementById("cart-total");
const setPriceElement = cartTotal.querySelector("h3");

let collectProductName = [];

function removeParticularProduct(particularProduct) {
    const findParticularProduct = collectProductName.filter(
        (element) => element !== particularProduct
    );
    collectProductName.length = 0;
    collectProductName.push(...findParticularProduct);
}

function updateTotalPrice() {
    const collectPrices = [];
    const grabAllQcProductPriceElement =
        document.querySelectorAll(".qc-product-price");

    if (cartItems.childElementCount === 0) {
        addEmptyCartElement();
    }

    grabAllQcProductPriceElement.forEach((element) => {
        collectPrices.push(Number(element.innerText.slice(1)));
    });

    const finalPrice = collectPrices.reduce((acc, crrval) => {
        return Number(acc) + Number(crrval);
    }, 0);

    setPriceElement.innerText = `Total: $${finalPrice.toFixed(2)}`;
}

function createCartItem(productName, productPrice) {
    const createCartItemParentDiv = document.createElement("div");
    createCartItemParentDiv.className = "cart-item";

    const createCartItemChildParagraph = document.createElement("p");
    createCartItemChildParagraph.className = "product-name-on-cart";
    createCartItemChildParagraph.innerText = productName;

    const createCartItemChildDiv = document.createElement("div");
    createCartItemChildDiv.className = "quantity-controls";

    const createItemDecrementButton = document.createElement("button");
    createItemDecrementButton.className = "decrement-button";
    createItemDecrementButton.innerText = "-";

    const createDynamicCountForItem = document.createElement("p");
    createDynamicCountForItem.className = "qc-numbers-of-item";
    createDynamicCountForItem.innerText = 1;

    const createItemIncrementButton = document.createElement("button");
    createItemIncrementButton.className = "increment-button";
    createItemIncrementButton.innerText = "+";

    const createDynamicPriceForEachItem = document.createElement("p");
    createDynamicPriceForEachItem.className = "qc-product-price";
    createDynamicPriceForEachItem.innerText = `$${productPrice}`;

    const createRemoveButtonForEachItem = document.createElement("button");
    createRemoveButtonForEachItem.innerText = "Remove";

    createItemDecrementButton.addEventListener("click", () => {
        createDynamicCountForItem.innerText--;

        if (createDynamicCountForItem.innerText <= 0) {
            createCartItemParentDiv.remove();
            removeParticularProduct(productName);
        }

        const validationForUpdatePriceTextForDec_qc =
            Number(createDynamicPriceForEachItem.innerText.slice(1)) -
            productPrice;
        createDynamicPriceForEachItem.innerText = `$${validationForUpdatePriceTextForDec_qc.toFixed(
            2
        )}`;

        updateTotalPrice();
    });

    createItemIncrementButton.addEventListener("click", () => {
        createDynamicCountForItem.innerText++;

        const validationForUpdatePriceTextForInc_qc =
            Number(createDynamicPriceForEachItem.innerText.slice(1)) +
            productPrice;
        createDynamicPriceForEachItem.innerText = `$${validationForUpdatePriceTextForInc_qc.toFixed(
            2
        )}`;

        updateTotalPrice();
    });

    createRemoveButtonForEachItem.addEventListener("click", () => {
        createCartItemParentDiv.remove();
        removeParticularProduct(productName);

        updateTotalPrice();
    });

    createCartItemChildDiv.append(
        createItemDecrementButton,
        createDynamicCountForItem,
        createItemIncrementButton,
        createDynamicPriceForEachItem,
        createRemoveButtonForEachItem
    );

    createCartItemParentDiv.append(
        createCartItemChildParagraph,
        createCartItemChildDiv
    );

    return createCartItemParentDiv;
}

function addToCart(productName, productPrice) {
    const isItemAlreadyPresent = collectProductName.includes(productName);

    if (!isItemAlreadyPresent) {
        collectProductName.push(productName);
        const finalElementForCartItem = createCartItem(
            productName,
            productPrice
        );
        cartItems.appendChild(finalElementForCartItem);

        emptyCart.remove();
    } else if (isItemAlreadyPresent) {
        const collectAllProductNameItem = cartItems.querySelectorAll(
            ".product-name-on-cart"
        );
        const productNameNodeListToArray = [...collectAllProductNameItem];

        const findCorrectItem = productNameNodeListToArray.filter(
            (element) => element.innerText === productName
        );
        const matchProductNameNextSibling =
            findCorrectItem[0].nextElementSibling;

        const updateCorrectElementCountValue =
            matchProductNameNextSibling.querySelector(".qc-numbers-of-item");
        const updateCorrectElementPrice =
            matchProductNameNextSibling.querySelector(".qc-product-price");

        const validationForUpdatePriceTextIncFor_atc =
            Number(updateCorrectElementPrice.innerText.slice(1)) + productPrice;

        updateCorrectElementCountValue.innerText++;
        updateCorrectElementPrice.innerText = `$${validationForUpdatePriceTextIncFor_atc.toFixed(
            2
        )}`;
    }

    updateTotalPrice();
}

function addEmptyCartElement() {
    cartItems.appendChild(emptyCart);
}
