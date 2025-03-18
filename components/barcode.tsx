"use client";

import Barcode, { BarcodeProps } from "react-barcode";

export default function BarcodeClient({
  value,
  className,
}: BarcodeProps & { className: string }) {
  return (
    <div className={className}>
      <Barcode
        format="CODE128"
        fontSize={0}
        width={0.5}
        height={40}
        value={value}
      />
    </div>
  );
}

// | "CODE39"
// | "CODE128"
// | "CODE128A"
// | "CODE128B"
// | "CODE128C"
// | "EAN13"
// | "EAN8"
// | "EAN5"
// | "EAN2"
// | "UPC"
// | "UPCE"
// | "ITF14"
// | "ITF"
// | "MSI"
// | "MSI10"
// | "MSI11"
// | "MSI1010"
// | "MSI1110"
// | "pharmacode"
// | "codabar"
// | "GenericBarcode";
