// get map locations via tiles.openfreemap.org
import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  coordinates: [number, number]; // Define props for map center coordinates
  showSymbol: boolean; // Object to toggle layers on/off
  zoom: number;
}

const MapComponent: React.FC<MapProps> = ({
  coordinates,
  showSymbol,
  zoom,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current!,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: coordinates,
        zoom: zoom,
        pitch: 60,
        bearing: 0,
      });

      // Map interaction restrictions
      mapRef.current.scrollZoom.disable();
      mapRef.current.dragPan.disable();
      mapRef.current.boxZoom.disable();
      mapRef.current.keyboard.disable();
      mapRef.current.doubleClickZoom.disable();
      mapRef.current.touchZoomRotate.disable();

      // Listen for missing images
      mapRef.current.on("styleimagemissing", (e) => {
        // Create a transparent 1x1 pixel image using ImageData
        const transparentImage = new ImageData(
          new Uint8ClampedArray([0, 0, 0, 0]),
          1,
          1
        );
        if (!mapRef.current?.hasImage(e.id)) {
          mapRef.current?.addImage(e.id, transparentImage);
        }
      });

      // Rotate function
      function rotateMap() {
        if (mapRef.current) {
          mapRef.current.setBearing(mapRef.current.getBearing() + 0.2);
          requestAnimationFrame(rotateMap);
        }
      }

      mapRef.current.on("load", () => {
        // Toggle text visibility based on the prop
        if (showSymbol === false) {
          const layers = mapRef.current?.getStyle().layers;

          layers?.forEach((layer) => {
            if (layer.type === "symbol") {
              mapRef.current?.setLayoutProperty(layer.id, "visibility", "none"); // Hide text layers
            }
          });
        }

        // Set up 3D buildings and water styling
        if (mapRef.current?.getLayer("building-3d")) {
          mapRef.current.setPaintProperty(
            "building-3d",
            "fill-extrusion-color",
            "#ffc0cb"
          );
        }
        if (mapRef.current?.getLayer("water")) {
          mapRef.current.setPaintProperty("water", "fill-color", "#8cb8ff");
        }

        rotateMap();
      });
    }
  }, [coordinates, showSymbol]); // Reinitialize if props change

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "500px" }}
      className="hexagon"
    />
  );
};

export default MapComponent;
