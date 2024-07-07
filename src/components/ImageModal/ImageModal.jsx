import  { useEffect } from 'react';
import Modal from 'react-modal';
import css from "./ImageModal.module.css";

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.modalOverlay}
      className={css.modalContent}
    >
      <img src={imageUrl} alt="Large view" className={css.modalImage} style={{ width: '100%' }} />
    </Modal>
  );
};

export default ImageModal;
