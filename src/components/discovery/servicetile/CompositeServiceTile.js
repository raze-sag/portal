import React, { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import * as S from '../style';
import PropTypes from 'prop-types';
import ExpandableView from "../../expandable/ExpandableView";
import ContactTab from "../tabs/ContactTab/ContactTab";
import PriceTab from "../tabs/priceTab/PriceTab";

import DescriptionTab from "../tabs/description/DescriptionTab";
import ScreenshotsTab from "../tabs/screenshots/ScreenshotsTab";
import { CheckBox } from "../search/style";
import { Image, Style } from "../../../common/styles";
import Tabs from "./tabs";
import DataPreview from "../tabs/dataPreview/DataPreview";
import { Columns } from "../tabs/dataPreview/style";


const CompositeServiceTile = ({ input, id, t }) => {
    const type = "composite-service";

    const showComponent = () => {
        return (
            <>
                <ExpandableView
                    initiallyExpanded={true} view={DescriptionTab({ id: id, type: type })}
                    title={<>{t("service-tile.details")}</>}
                    titleTrailerPadding="12px"
                    viewLeadingPadding="40px"
                    titleLeadingPadding="40px"
                    arrowColor="#B3B3B3" width="848px"/>
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id: id, type: "services" })} title={<>{t("service-tile.price")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width="848px;"/>
                <ExpandableView initiallyExpanded={false} view={ScreenshotsTab({ serviceId: id })} title={<>{t("service-tile.screenshots")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width="848px"/>
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: id, type: "services" })} title={<>{t("service-tile.contact")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width="848px"/>
            </>
        )
    }


    const showTileHeader = () => {


        return (
            <S.DiscoveryTile isComposite={true}>

                <S.DiscoveryTileHeader>

                    <CheckBox type="checkbox" />
                    <a href={"#" || input.services.ppr_url}>
                        {/* <Image */}
                        <Image src={input.logo} alt="Provider Logo" width='48px' height='48px' />
                    </a>
                    <Style flexGrow='0'>
                        <S.DiscoveryTileFirstRow width={'140px'}>{input.name}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.ppr_name}</S.DiscoveryTileSecondRow>
                    </Style>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.stack")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.stack}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.security")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.security}</S.DiscoveryTileSecondRow>
                    </div>
                    <div>
                        <S.DiscoveryTileFirstRow>{t("service-tile.header.location")}</S.DiscoveryTileFirstRow>
                        <S.DiscoveryTileSecondRow>{input.location}</S.DiscoveryTileSecondRow>
                    </div>
                    <S.DiscoveryDetailsButton>
                        {t("service-tile.details")}
                    </S.DiscoveryDetailsButton>
                </S.DiscoveryTileHeader>
                
            </S.DiscoveryTile>
        );
    }

    const showTileContent = () => {
        return (
            <S.DiscoveryDetailsContent>
                <S.DiscoveryDetailsBody>
                    {showComponent()}
                </S.DiscoveryDetailsBody>
            </S.DiscoveryDetailsContent>
        );
    }

    return (
        <ExpandableView initiallyExpanded={false} view={showTileContent()} title={showTileHeader()} border={true} />
    );

}

CompositeServiceTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation()(CompositeServiceTile);