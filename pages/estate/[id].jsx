import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
import Map from "../../components/index";

const ViewEstate = ({props}) => {
  const router = useRouter();
  const [data, setData] = useState({});

  const center = [data.geo_lat, data.geo_lng];

  const endPoint = `${process.env.NEXT_PUBLIC_URL_API}`;
  async function getEstateDetaill() {
    try {
      const { data } = await axios.get(`${endPoint}/getEstate`, {
        params: { url: router.query.id },
      });
      if (!data) return;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log("Error");
    }
  }

  useEffect(() => {
    /* getEstateDetaill(); */
  }, [router.query.id]);
  return (
    <>
      <div className="container">
        <div className="detaills">
          <div className="card-header">
            {data?.geo_lat && (
              <Map className="map" center={center} zoom={12}>
                {({ TileLayer, Marker, Popup }) => (
                  <>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={center}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </>
                )}
              </Map>
            )}
            <div className="items">
              <div>
                <span className="item">
                  Nombre de la propiedad:{" "}
                  <span className="item-estate">{data.name}</span>
                </span>
                <br />
                <span className="item">
                  Direccion:{" "}
                  <span className="item-estate">{data?.address}</span>
                </span>
                <br />
                <span className="item">
                  Ciudad: <span className="item-estate">{data?.city}</span>
                </span>
                <br />
                <span className="item">
                  Precio: ${" "}
                  <span className="item-estate">{data?.naturalPrice}</span>
                </span>
                <br />
                <span className="item">
                  Codigo Postal:{" "}
                  <span className="item-estate">{data?.postalCode}</span>
                </span>
                <br />
              </div>
              <Link href="/">
                <button className="btn btn-primary">Volver</button>
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ res, query }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/getEstate`,
    {
      params: { url: query.id },
    }
  );
  res.setHeader("Content-language", "es");
  return { props: { data: response.data } };
}
export default ViewEstate;
