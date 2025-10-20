import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const Icon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" /></Icon>
);
export const MoonIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.752-2.648z" /></Icon>
);
export const WalletIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 3V9M3 9a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9" /></Icon>
);
export const PlusIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></Icon>
);
export const PiggyBankIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path fillRule="evenodd" d="M8.25 4.5a.75.75 0 01.75.75v.5c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v.5c0 .414.336.75.75.75h.75a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-1.5v2.25a2.25 2.25 0 01-2.25 2.25h-4.5a2.25 2.25 0 01-2.25-2.25V13.5h-1.5a2.25 2.25 0 01-2.25-2.25V9a2.25 2.25 0 012.25-2.25h.75a.75.75 0 00.75-.75v-.5a.75.75 0 01.75-.75h.75z" clipRule="evenodd" /></Icon>
);
export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></Icon>
);
export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></Icon>
);
export const TrashIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.533c-1.12 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></Icon>
);
export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></Icon>
);
export const PencilIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.786a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></Icon>
);
export const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></Icon>
);
export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></Icon>
);
export const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" /></Icon>
);
export const BillIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></Icon>
);
export const CashIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-15c-.621 0-1.125-.504-1.125-1.125v-9.75c0-.621.504-1.125 1.125-1.125h.375m15-1.5a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75" /></Icon>
);
export const ScaleIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.251 0-4.382.16-6.32.47M12 4.5c-2.251 0-4.382.16-6.32.47M12 4.5c2.251 0 4.382.16 6.32.47M3.75 6.75h16.5M3.75 6.75c-1.036 0-1.875.84-1.875 1.875v10.5c0 1.036.84 1.875 1.875 1.875h16.5c1.036 0 1.875-.84 1.875-1.875v-10.5c0-1.036-.84-1.875-1.875-1.875M3.75 6.75v-1.5c0-.621.504-1.125 1.125-1.125h13.5c.621 0 1.125.504 1.125 1.125v1.5" /></Icon>
);

const HomeIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955a.75.75 0 01-1.06 1.06l-1.5-1.5V21a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V11.56l-1.5 1.5a.75.75 0 01-1.06-1.06z" /></Icon>
);
const BoltIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></Icon>
);
const WaterDropIcon: React.FC<IconProps> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.32 0-9.75 4.38-9.75 9.75 0 5.37 9.75 11.25 9.75 11.25s9.75-5.88 9.75-11.25c0-5.37-4.43-9.75-9.75-9.75zm0 12.75a3 3 0 100-6 3 3 0 000 6z" /></Icon>
);
const MotorcycleIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /><path d="M7.5 21a3 3 0 003-3h3a3 3 0 003 3M4.5 10.5h15" /></Icon>
);
const TvIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m-3.75-3.75H4.5v-1.5a3.375 3.375 0 013.375-3.375h7.25A3.375 3.375 0 0118.5 15v1.5h-1.875m-3.75 0v-3.75" /></Icon>
);
const RestaurantIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></Icon>
);
const DefaultIcon: React.FC<IconProps> = (props) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></Icon>
);


const iconMap: { [key: string]: React.FC<IconProps> } = {
  Home: HomeIcon,
  Bolt: BoltIcon,
  WaterDrop: WaterDropIcon,
  Motorcycle: MotorcycleIcon,
  Tv: TvIcon,
  Restaurant: RestaurantIcon,
  Default: DefaultIcon,
};

export const getIcon = (name: string): React.FC<IconProps> => {
  return iconMap[name] || iconMap.Default;
};
