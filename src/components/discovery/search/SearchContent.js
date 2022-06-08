import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import configData from "../../../config/config.json";  
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import NextPrevButtons from "./NexPrevButtons";
import TileFactory from "../TileFactory";
import { HeaderTitle } from "../../../common/styles";
import { useTranslation } from "react-i18next";

const SearchContent = ({type}) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const URL = configData.EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;
    const dispatch = useDispatch();

    const {t, i18n} = useTranslation();

    const showData = (data) => {
        if (!data) return;
        return(data.data.map((item, i)=>{return (<TileFactory data={item} id={`${item.id}`} key={item.i}/>)}))
    }

    const loadData = ({data}) => {
        return (<>
                <HeaderTitle>{t('discovery.lists.data')}</HeaderTitle>
            {showData(data)}
            <NextPrevButtons data={data}/>
        </>
        );
    }

    console.log(URL);
    return (<LoadingView url={URL}
        successView={loadData} key={URL}/>);
}

SearchContent.propTypes = {
    type: PropTypes.string
};


export default SearchContent;