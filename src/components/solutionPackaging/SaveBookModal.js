import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import * as S from '../discovery/style';
import { useTranslation } from 'react-i18next';
import { BlueButton, CancelButton, Column, Padding, Row} from '../../common/styles';
import { ActionCancelModalHeader, ModalMessage } from '../../common/ActionCancelModalStyle';
import { BookSaveInput } from './style';


const SaveBookModal = ({action, closeModal, onSaveBook}) => {

    const {t} = useTranslation();
    const [name, setName] = useState('');

     return (   
        <Modal width='fit-content'>
            <Column margin="0px 0px 0px 0px">
                <ActionCancelModalHeader>
                    <Padding paddingLeft='24px' paddingTop='16px' paddingRight='300px'>
                        {t(`solution_pkg.saveBookModalMessage-${action}`)}
                    </Padding>
                </ActionCancelModalHeader>
                <ModalMessage> 
                    {t('solution_pkg.enterNameMessage')}
                </ModalMessage>
                <BookSaveInput value={name} onChange={(e)=>setName(e.target.value)} /> 
                
                <Row margin='24px 24px 24px 10px'>
                    <CancelButton onClick={closeModal}>{t('solution_pkg.cancel')}</CancelButton>
                    <BlueButton disabled={name===''} onClick={()=>{onSaveBook(name, action)}}>{t(`solution_pkg.${action}`)}</BlueButton>
                </Row>
            </Column>
        </Modal>
    )
}
SaveBookModal.propTypes = {
    action: PropTypes.string,
    closeModal: PropTypes.func,
    onSaveBook: PropTypes.func
}


export default SaveBookModal;