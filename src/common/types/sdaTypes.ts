export enum EItemTrackingStatus {
  DELIVERED = 'Delivered',
  DELIVERING = 'Delivering',
  IN_TRANSIT = 'InTransit',
  SHIPPED = 'Shipped',
  UNKNOWN = 'Unknown',
}

export const sdaTypes = {
  [EItemTrackingStatus.DELIVERED]: '000',
  [EItemTrackingStatus.DELIVERING]: '001',
  [EItemTrackingStatus.IN_TRANSIT]: '004',
  [EItemTrackingStatus.SHIPPED]: '053',
  [EItemTrackingStatus.UNKNOWN]: '_',
};

export type SdaTypes = keyof typeof sdaTypes;
