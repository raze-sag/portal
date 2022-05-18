import React,{ useState, createRef } from "react";
import { withTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LoadingView from "../../loading_view/LoadingView";
import ExpandableView from "../../expandable/ExpandableView";
import "../servicetile/ServiceTile.css";
import * as S from '../style';
import PropTypes from 'prop-types';
import DescriptionTabView from "../tabs/DescriptionTabView";

const DataTile = (props) => {
    const {dataId} = useParams();
    const [queryParams, setQueryParams] = useSearchParams();
    const view = queryParams.get("view");
    const [showDetails, setShowDetails] = useState(true);
    const contentRef = createRef();

    const input = { // mocked input for component. One element from input list. Parent components retrieves input via API
            "type": "data",
            "logo": "URL to image of PPR logo",
            "ppr_url": "URL to PPR",
            "name": "data name",
            "ppr_name": "PPR name",
            "id": "data id",
            "short_description": "String",
            "location": "String"
    }

    const styleTabActive = (key) => {
        if (view === key) {
            return "service-tile_active_tab";
        }
        return ""
    }

    const styleDivHidden = (bool) => {
        if (bool) {
            contentRef.current.style.display = 'block';
        } 
        else {
            contentRef.current.style.display = 'none';
        }
        setShowDetails(!showDetails);
    }

    const DescriptionTab = ({ dataId }) => {
        return (
            <LoadingView
                url={`https://reqres.in/api/users/${dataId}?delay=1`}
                successView={DescriptionTabView}
            />
        )
    }

    const showComponent = () => {
        return (
            <>
                <ExpandableView initiallyExpanded={true} view={DescriptionTab({ dataId: 1 })} title={props.t("service-tile.details")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ dataId: 1 })} title={props.t("service-tile.price")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ dataId: 1 })} title={props.t("service-tile.sample")} />
                <ExpandableView initiallyExpanded={false} view={DescriptionTab({ dataId: 1 })} title={props.t("service-tile.contact")} />
            </>
        )
    }

    return (
        <S.DiscoveryTile>
            <S.DiscoveryTileHeader>
                <a href={"#" || input.ppr_url}>
                    <img src={input.logo} alt="Provider Logo"></img>
                </a>
                <div>
                    <S.DiscoveryTileFirstRow>{input.name}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.ppr_name}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.sustainability")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.short_description}</S.DiscoveryTileSecondRow>
                </div>
                <div>
                    <S.DiscoveryTileFirstRow>{props.t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                    <S.DiscoveryTileSecondRow>{input.location}</S.DiscoveryTileSecondRow>
                </div>
                <S.DiscoveryDetailsButton onClick={() => styleDivHidden(showDetails)}>
                {props.t("service-tile.details")}
                </S.DiscoveryDetailsButton>
            </S.DiscoveryTileHeader>
            <S.DiscoveryHiddenContent ref={contentRef}>
            <S.DiscoveryTileContent>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryTileContent>
            </S.DiscoveryHiddenContent>
        </S.DiscoveryTile>
    );
}

DataTile.propTypes = {
    dataId: PropTypes.func,
    t: PropTypes.func,
}

export default withTranslation () (DataTile);