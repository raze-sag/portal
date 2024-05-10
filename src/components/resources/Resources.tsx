import { useContext, useEffect, useState } from "react";

import SelfDescriptionCard from "components/cards/SelfDescriptionCard";
import { ApiService } from "services/ApiService";
import { AuthContext } from "context/AuthContextProvider";
import { Resource, mapResources } from "utils/dataMapper";

// import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import car from "../../assets/car.gif";
import Title from "components/Title/Title";
import Filter from "components/filter/Filter";
import { useFilters } from "context/ResourceFilterContext";
import { useResourceFilter } from "hooks/useResourceFilter";

import styles from "./Resources.module.css";

const Resources = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [resourceData, setResourceData] = useState<Resource[]>([]);
  const { filters } = useFilters();
  const { typeAssets, formatAssets, vendorAssets, fetchFilteredData } = useResourceFilter();
  const { toggleResourceFilter } = useFilters();

  // Fetch all resources on component mount
  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getAllResources(authContext);
        console.log("My fetched data: ", response);
        const map = mapResources(response);
        setResourceData(map);
      } catch (error) {
        console.error("Error fetching self descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetSelfDescriptions();
  }, []);

  // Fetch filtered resources based on the filters
  useEffect(() => {
    setIsLoading(true);
    fetchFilteredData()
      .then((data) => {
        const map = mapResources(data);
        setResourceData(map);
      })
      .catch((error) => {
        console.error("Error in fetching data:", error);
      });
    setIsLoading(false);
  }, [filters]);

  return (
    <div>
      <header className={styles["header-container"]}>
        <div className={styles["header-title"]}>
          <Title>Resources</Title>
        </div>
      </header>
      <div className={styles["resource-content-container"]}>
        <Filter
            typeAssets={typeAssets}
            formatAssets={formatAssets}
            vendorAssets={vendorAssets}
            toggleFilter={toggleResourceFilter}
        />
        {authContext.isAuthenticated && (
          <div className={styles.content}>
            <div>
              {!isLoading &&
                resourceData.length > 0 &&
                resourceData.map((resource) => {
                  return (
                    <SelfDescriptionCard
                      key={resource.name}
                      label={resource.label}
                      isGaiaXComlpiant={true}
                      name={resource.name}
                      description={resource.description}
                      selfDescription={resource}
                    />
                  );
                })}
              {isLoading && (
                <div className="newCarLoader">
                  <img src={car} alt="loading..." className="car" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!authContext.isAuthenticated && <p>You are not authenticated!</p>}
    </div>
  );
};
export default Resources;
