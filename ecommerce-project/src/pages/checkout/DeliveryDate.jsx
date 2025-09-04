import dayjs from "dayjs";

function DeliveryDate({ deliveryOptions, cart }) {
  return (
    deliveryOptions.length > 0 && cart.map((cartItem) => {
      const selectedDeliveryOption = deliveryOptions
        .find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId
        })

      return (
        <div key={selectedDeliveryOption.id} className="delivery-date">
          Delivery date:{dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

      )
    })
  );
}

export default DeliveryDate