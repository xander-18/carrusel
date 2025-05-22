import React, { useState, useEffect } from 'react';
import '../assets/style/payment.css';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const PaymentModal = ({ onClose, onComplete }) => {
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    departamento: '',
    ciudad: '',
    distrito: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    yapeConfirmation: '',
    transferConfirmation: '',
    cashReference: ''
  });
  const [datasetPeru, setDatasetPeru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datasetPeru.json al montar el componente
  useEffect(() => {
    fetch('/data/datasetPeru.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo datasetPeru.json');
        }
        return response.json();
      })
      .then(data => {
        setDatasetPeru(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar datos',
          text: 'No se pudo cargar la lista de departamentos. Intenta de nuevo más tarde.',
          confirmButtonColor: '#3085d6'
        });
      });
  }, []);

  const handleNextStep = () => {
    if (step === 1 && validateDeliveryForm()) {
      setStep(2);
    } else if (step === 2 && validatePaymentForm()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleCompletePurchase = () => {
    onComplete();
  };

  const validateDeliveryForm = () => {
    const { name, phone, departamento, ciudad, distrito, address } = formData;
    if (deliveryMethod === 'delivery' && (!name || !phone || !departamento || !ciudad || !distrito || !address)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos requeridos',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }
    return true;
  };

  const validatePaymentForm = () => {
    const { cardNumber, cardExpiry, cardCvv, cardName, yapeConfirmation, transferConfirmation, cashReference } = formData;
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv || !cardName)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos de la tarjeta',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }
    if (paymentMethod === 'yape' && !yapeConfirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, ingresa el número de operación de Yape',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }
    if (paymentMethod === 'transfer' && !transferConfirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, ingresa el número de operación de la transferencia',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }
    if (paymentMethod === 'cash' && !cashReference) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, ingresa tu número de documento de identidad',
        confirmButtonColor: '#3085d6'
      });
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Finalizar Compra</h3>
          <span className="close-modal" onClick={onClose}>×</span>
        </div>
        <div className="modal-body">
          <div className="payment-steps">
            <div className={['step', step === 1 ? 'active' : ''].join(' ')} data-step="delivery">
              <div className="step-number">1</div>
              <div className="step-title">Entrega</div>
            </div>
            <div className={['step', step === 2 ? 'active' : ''].join(' ')} data-step="payment">
              <div className="step-number">2</div>
              <div className="step-title">Pago</div>
            </div>
            <div className={['step', step === 3 ? 'active' : ''].join(' ')} data-step="confirmation">
              <div className="step-number">3</div>
              <div className="step-title">Confirmación</div>
            </div>
          </div>
          {step === 1 && (
            <DeliveryForm
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
              datasetPeru={datasetPeru}
            />
          )}
          {step === 2 && (
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {step === 3 && <ConfirmationForm cart={cart} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} />}
          <div className="form-buttons">
            {step > 1 && <button className="btn-secondary prev-step" onClick={handlePrevStep}>Volver</button>}
            {step < 3 && <button className="btn-primary next-step" onClick={handleNextStep}>Continuar</button>}
            {step === 3 && <button className="btn-primary" onClick={handleCompletePurchase}>Pagar ahora</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryForm = ({ deliveryMethod, setDeliveryMethod, formData, setFormData, handleInputChange, datasetPeru }) => {
  const [selectedDepartamento, setSelectedDepartamento] = useState(formData.departamento || '');
  const [selectedCiudad, setSelectedCiudad] = useState(formData.ciudad || '');
  const [selectedDistrito, setSelectedDistrito] = useState(formData.distrito || '');

  const departamentos = datasetPeru.Departamentos.map(dep => dep.Departamento);

  // Obtener ciudades basadas en el departamento seleccionado
  const selectedDepData = datasetPeru.Departamentos.find(dep => dep.Departamento === selectedDepartamento);
  const ciudades = selectedDepData ? selectedDepData.Ciudades.map(ciudad => ciudad.Ciudad) : [];

  // Obtener distritos basados en la ciudad seleccionada
  const selectedCiudadData = selectedDepData?.Ciudades.find(ciudad => ciudad.Ciudad === selectedCiudad);
  const distritos = selectedCiudadData ? selectedCiudadData.Distritos : [];

  // Manejar cambios en los selects
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departamento') {
      setSelectedDepartamento(value);
      setSelectedCiudad('');
      setSelectedDistrito('');
      setFormData({
        ...formData,
        departamento: value,
        ciudad: '',
        distrito: '',
        address: ''
      });
    } else if (name === 'ciudad') {
      setSelectedCiudad(value);
      setSelectedDistrito('');
      setFormData({
        ...formData,
        ciudad: value,
        distrito: '',
        address: ''
      });
    } else if (name === 'distrito') {
      setSelectedDistrito(value);
      setFormData({
        ...formData,
        distrito: value
      });
    }
  };

  return (
    <div className="payment-form" id="delivery-form">
      <h4>Método de entrega</h4>
      <div className="form-group">
        <label>
          <input
            type="radio"
            name="delivery-method"
            value="delivery"
            checked={deliveryMethod === 'delivery'}
            onChange={() => setDeliveryMethod('delivery')}
          />
          Delivery a domicilio
        </label>
        <label>
          <input
            type="radio"
            name="delivery-method"
            value="pickup"
            checked={deliveryMethod === 'pickup'}
            onChange={() => setDeliveryMethod('pickup')}
          />
          Recojo en tienda
        </label>
      </div>
      {deliveryMethod === 'delivery' && (
        <div id="delivery-address">
          <h4>Datos de entrega</h4>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="departamento">Departamento</label>
            <select
              id="departamento"
              name="departamento"
              value={selectedDepartamento}
              onChange={handleSelectChange}
              required
            >
              <option value="">Selecciona un departamento</option>
              {departamentos.map((dep, index) => (
                <option key={index} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          {selectedDepartamento && (
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad</label>
              <select
                id="ciudad"
                name="ciudad"
                value={selectedCiudad}
                onChange={handleSelectChange}
                required
              >
                <option value="">Selecciona una ciudad</option>
                {ciudades.map((ciudad, index) => (
                  <option key={index} value={ciudad}>{ciudad}</option>
                ))}
              </select>
            </div>
          )}
          {selectedCiudad && (
            <div className="form-group">
              <label htmlFor="distrito">Distrito</label>
              <select
                id="distrito"
                name="distrito"
                value={selectedDistrito}
                onChange={handleSelectChange}
                required
              >
                <option value="">Selecciona un distrito</option>
                {distritos.map((distrito, index) => (
                  <option key={index} value={distrito}>{distrito}</option>
                ))}
              </select>
            </div>
          )}
          {selectedDistrito && (
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>
      )}
      {deliveryMethod === 'pickup' && (
        <div id="pickup-store">
          <h4>Selecciona la tienda</h4>
          <div className="form-group">
            <label htmlFor="store">Tienda</label>
            <select id="store">
              <option value="store1">Tienda Central - Av. Principal 123</option>
              <option value="store2">Tienda Norte - Plaza Mayor 456</option>
              <option value="store3">Tienda Sur - Centro Comercial Elite</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Resto del código (PaymentForm, ConfirmationForm, Payment) permanece sin cambios
const PaymentForm = ({ paymentMethod, setPaymentMethod, formData, handleInputChange }) => {
  return (
    <div className="payment-form" id="payment-form">
      <h4>Método de pago</h4>
      <div className="payment-methods">
        <div
          className={['payment-method', paymentMethod === 'card' ? 'active' : ''].join(' ')}
          data-method="card"
          onClick={() => setPaymentMethod('card')}
        >
          <i className="far fa-credit-card"></i>
          <span>Tarjeta</span>
        </div>
        <div
          className={['payment-method', paymentMethod === 'yape' ? 'active' : ''].join(' ')}
          data-method="yape"
          onClick={() => setPaymentMethod('yape')}
        >
          <i className="fas fa-mobile-alt"></i>
          <span>Yape</span>
        </div>
        <div
          className={['payment-method', paymentMethod === 'transfer' ? 'active' : ''].join(' ')}
          data-method="transfer"
          onClick={() => setPaymentMethod('transfer')}
        >
          <i className="fas fa-university"></i>
          <span>Transferencia</span>
        </div>
        <div
          className={['payment-method', paymentMethod === 'cash' ? 'active' : ''].join(' ')}
          data-method="cash"
          onClick={() => setPaymentMethod('cash')}
        >
          <i className="fas fa-money-bill-wave"></i>
          <span>Contra entrega</span>
        </div>
      </div>
      {paymentMethod === 'card' && (
        <div className="payment-method-form" id="card-form">
          <div className="form-group">
            <label htmlFor="card-number">Número de tarjeta</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="card-expiry">Vencimiento (MM/AA)</label>
              <input
                type="text"
                id="card-expiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/AA"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-cvv">CVV</label>
              <input
                type="text"
                id="card-cvv"
                name="cardCvv"
                value={formData.cardCvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="card-name">Nombre en la tarjeta</label>
            <input
              type="text"
              id="card-name"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {paymentMethod === 'yape' && (
        <div className="payment-method-form" id="yape-form">
          <div className="yape-qr">
            <img src="assets/qr_yape.jpeg" alt="Código QR Yape" />
          </div>
          <p>Escanea el código QR con tu app de Yape o envía el pago al número: 944-541-475</p>
          <div className="form-group">
            <label htmlFor="yape-confirmation">Número de operación</label>
            <input
              type="text"
              id="yape-confirmation"
              name="yapeConfirmation"
              value={formData.yapeConfirmation}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {paymentMethod === 'transfer' && (
        <div className="payment-method-form" id="transfer-form">
          <div className="bank-details">
            <p><strong>Banco:</strong> BBVA</p>
            <p><strong>Cuenta:</strong> 001-789456-123-00</p>
            <p><strong>Titular:</strong> Jordan Elite S.A.C.</p>
          </div>
          <div className="form-group">
            <label htmlFor="transfer-confirmation">Número de operación</label>
            <input
              type="text"
              id="transfer-confirmation"
              name="transferConfirmation"
              value={formData.transferConfirmation}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {paymentMethod === 'cash' && (
        <div className="payment-method-form" id="cash-form">
          <div className="cash-details">
            <p><strong>Pago contra entrega:</strong> Pagarás cuando recibas tu pedido</p>
            <p>El pago se puede realizar en efectivo al momento de la entrega.</p>
            <p>Por favor, prepara el monto exacto para facilitar la entrega.</p>
          </div>
          <div className="form-group">
            <label htmlFor="cash-reference">Documento de identidad (DNI/CE)</label>
            <input
              type="text"
              id="cash-reference"
              name="cashReference"
              value={formData.cashReference}
              onChange={handleInputChange}
              placeholder="Ingresa tu DNI o CE"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ConfirmationForm = ({ cart, deliveryMethod, paymentMethod }) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = deliveryMethod === 'delivery' ? 5.00 : 0.00;
  const total = subtotal + shipping;

  const getPaymentMessage = () => {
    switch (paymentMethod) {
      case 'card':
        return 'Pago con tarjeta';
      case 'yape':
        return 'Pago con Yape';
      case 'transfer':
        return 'Pago por transferencia bancaria';
      case 'cash':
        return 'Pago contra entrega en efectivo';
      default:
        return 'Método de pago seleccionado';
    }
  };

  return (
    <div className="payment-form" id="confirmation-form">
      <h4>Resumen de compra</h4>
      <div className="order-summary">
        <div className="summary-items">
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <div className="summary-item-name">{item.name}</div>
              <div className="summary-item-quantity">x{item.quantity}</div>
              <div className="summary-item-price">{"$" + (item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <div className="summary-row">
            <span>Subtotal</span>
            <span className="summary-subtotal">{"$" + subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="summary-shipping">{"$" + shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span className="summary-total-amount">{"$" + total.toFixed(2)}</span>
          </div>
        </div>
        <div className="payment-details">
          <p><strong>Método de entrega:</strong> {deliveryMethod === 'delivery' ? 'Delivery a domicilio' : 'Recojo en tienda'}</p>
          <p><strong>Método de pago:</strong> {getPaymentMessage()}</p>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No hay productos en el carrito',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras el proceso de compra, perderás la información ingresada',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'No, continuar'
    }).then(result => {
      if (result.isConfirmed) {
        setIsModalOpen(false);
      }
    });
  };

  const handleCompletePurchase = () => {
    clearCart();
    setIsModalOpen(false);
    Swal.fire({
      icon: 'success',
      title: '¡Compra realizada con éxito!',
      text: 'Gracias por tu compra. Pronto recibirás la confirmación en tu correo.',
      confirmButtonColor: '#3085d6'
    });
  };

  return (
    <div className="payment-container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Tu carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-quantity">x{item.quantity}</div>
              <div className="cart-item-price">{ '$' + (item.price * item.quantity).toFixed(2) }</div>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total:</strong> {getTotalPrice().toFixed(2)}
          </div>
          <button className="btn-primary" onClick={handleProceedToCheckout}>
            Proceder al pago
          </button>
        </div>
      )}

      {isModalOpen && <PaymentModal onClose={handleCloseModal} onComplete={handleCompletePurchase} />}
    </div>
  );
};

export default Payment;