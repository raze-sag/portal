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
import { Column, Image, Padding, Row, Style } from "../../../common/styles";


const ServiceTile = ({ input, id, t }) => {
    const type = "services";

    const showComponent = () => {
        let _width = "100%"
        return (
            <>
                <ExpandableView
                    initiallyExpanded={true} view={DescriptionTab({ id: id, type: type })}
                    title={<>{t("service-tile.details")}</>}    // converting string to a React element to remove console warning
                    titleTrailerPadding="12px"
                    viewLeadingPadding="40px"
                    titleLeadingPadding="40px"
                    arrowColor="#B3B3B3"
                    width={_width} />
                <ExpandableView initiallyExpanded={false} view={PriceTab({ id: id, type: type })} title={<>{t("service-tile.price")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width} />
                <ExpandableView initiallyExpanded={false} view={ScreenshotsTab({ serviceId: id })} title={<>{t("service-tile.screenshots")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={'900px'} />
                <ExpandableView initiallyExpanded={false} view={ContactTab({ id: id, type: type })} title={<>{t("service-tile.contact")}</>} titleTrailerPadding="12px" viewLeadingPadding="40px" titleLeadingPadding="40px" arrowColor="#B3B3B3" width={_width} />
            </>
        )
    }


    const showTileHeader = () => {


        return (
            <S.DiscoveryTile>
                <Row alignItems='Center' justifyContent='space-around'>
                    {/* <Padding horizontal='28px' vertical='26px'><CheckBox type="checkbox" /></Padding> */}
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
                </Row>
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

ServiceTile.propTypes = {
    input: PropTypes.object,
    id: PropTypes.string,
    t: PropTypes.func
}

export default withTranslation()(ServiceTile);