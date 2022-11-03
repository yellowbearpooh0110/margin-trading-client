import * as React from 'react';
import {
  alpha,
  styled,
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  ListItemAvatar,
  TextField
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import AxiosService from 'services/axios';
import Select, { components, OptionProps, ControlProps } from 'react-select';
import { useSocket } from 'providers/SocketProvider';
import { useAuth } from 'providers/AuthProvider';

type SelectOptionType<T = string> = {
  value: T;
  label: string;
  type?: 'network' | 'coin';
};

type NetworkType = 'ethereum' | 'binance' | 'avalanche';

const networkOptions: Array<SelectOptionType<NetworkType>> = [
  { value: 'ethereum', label: 'Ethereum Mainnet' },
  { value: 'binance', label: 'Binance Smart Chain' },
  { value: 'avalanche', label: 'Avalanche C-Chain' }
];

const coinOptions: { [key in NetworkType]: Array<SelectOptionType> } = {
  ethereum: [
    { value: 'eth', label: 'Ether', type: 'coin' },
    { value: 'usdt', label: 'Tether USD', type: 'coin' },
    { value: 'dai', label: 'Dai Stablecoin', type: 'coin' }
  ],
  binance: [
    { value: 'bnb', label: 'BNB', type: 'coin' },
    { value: 'usdt', label: 'Tether USD', type: 'coin' }
  ],
  avalanche: [{ value: 'avax', label: 'AVAX', type: 'coin' }]
};

const NetworkListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.2)};
  border-radius: ${theme.spacing(1.05)};
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[40]
      : alpha(theme.colors.alpha.black[100], 0.8)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: 0;
    display: block;
    border-radius: ${theme.spacing(1)};
    height: ${theme.spacing(4)};
    width: ${theme.spacing(4)};
  }
`
);

const NetworkOption = ({
  children,
  ...props
}: OptionProps<SelectOptionType>) => {
  return (
    <div>
      <components.Option {...props}>
        <Box display="flex" alignItems="center">
          <NetworkListItemAvatarWrapper>
            <img
              alt={props.data.value}
              src={`/static/images/icons/${props.data.type || 'network'}s/${
                props.data.value
              }.png`}
            />
          </NetworkListItemAvatarWrapper>
          {children}
        </Box>
      </components.Option>
    </div>
  );
};

const NetworkControl = ({
  children,
  ...props
}: ControlProps<SelectOptionType, false>) => {
  const theme = useTheme();
  const selectedOption = props.selectProps.value as SelectOptionType;
  return (
    <components.Control {...props}>
      {selectedOption && (
        <NetworkListItemAvatarWrapper
          sx={{ margin: theme.spacing(0.5, 0, 0.5, 1.2) }}
        >
          <img
            alt={selectedOption.value}
            src={`/static/images/icons/${selectedOption.type || 'network'}s/${
              selectedOption.value
            }.png`}
          />
        </NetworkListItemAvatarWrapper>
      )}
      {children}
    </components.Control>
  );
};

const CoinListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  border-radius: 60px;

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: 0;
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.4)};
    width: ${theme.spacing(4.4)};
  }
`
);

const CoinOption = ({ children, ...props }: OptionProps<SelectOptionType>) => {
  return (
    <div>
      <components.Option {...props}>
        <Box display="flex" alignItems="center">
          <CoinListItemAvatarWrapper>
            <img
              alt={props.data.value}
              src={`/static/images/icons/${props.data.type || 'network'}s/${
                props.data.value
              }.png`}
            />
          </CoinListItemAvatarWrapper>
          {children}
        </Box>
      </components.Option>
    </div>
  );
};

const CoinControl = ({
  children,
  ...props
}: ControlProps<SelectOptionType, false>) => {
  const theme = useTheme();
  const selectedOption = props.selectProps.value as SelectOptionType;
  return (
    <components.Control {...props}>
      {selectedOption && (
        <CoinListItemAvatarWrapper
          sx={{ margin: theme.spacing(0.5, 0, 0.5, 1.2) }}
        >
          <img
            alt={selectedOption.value}
            src={`/static/images/icons/${selectedOption.type || 'network'}s/${
              selectedOption.value
            }.png`}
          />
        </CoinListItemAvatarWrapper>
      )}
      {children}
    </components.Control>
  );
};

const Exchange: React.FC = () => {
  const theme = useTheme();
  const { socket } = useSocket();
  const { authState } = useAuth();

  const [network, setNetwork] = React.useState<SelectOptionType<NetworkType>>(
    networkOptions[0]
  );
  const [coin, setCoin] = React.useState<SelectOptionType>(
    coinOptions.ethereum[0]
  );
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    setCoin(coinOptions[network.value][0]);
  }, [network]);

  const handleDeposit = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (!socket.connected) return;

      socket.emit('deposit', { user_id: '', token_name: '', amount: 1 });
    },
    [socket]
  );
  React.useEffect(() => {
    const listener = socket.on('success', () => {
      console.log('success');
    });
    return () => {
      listener.removeListener();
    };
  }, [socket]);

  return (
    <Card>
      <Grid spacing={1} container p={4}>
        <Grid item xs={12}>
          <Typography sx={{ pb: 3 }} variant="h3">
            Deposit
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ pb: 1 }} variant="h4">
            Choose Network
          </Typography>
          <Select
            value={network}
            onChange={(val) => setNetwork(val as SelectOptionType<NetworkType>)}
            options={networkOptions}
            components={{ Option: NetworkOption, Control: NetworkControl }}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 999 }) }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ pb: 1 }} variant="h4">
            Choose Coin
          </Typography>
          <Select
            value={coin}
            onChange={(val) => setCoin(val as SelectOptionType)}
            options={coinOptions[network.value]}
            components={{ Option: CoinOption, Control: CoinControl }}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 999 }) }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ pb: 1 }} variant="h4">
            Input Amount
          </Typography>
          <TextField
            value={amount}
            onChange={(event) => {
              event.preventDefault();
              // const _val = Number(event.currentTarget.value);
              // if (Number.isNaN(_val)) return;
              // else setAmount(_val);
              setAmount(Number(event.currentTarget.value));
            }}
            label="Amount"
            type="number"
            fullWidth
            InputProps={{ endAdornment: coin.value.toUpperCase() }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            disableRipple={false}
            disabled={amount <= 0}
            onClick={handleDeposit}
          >
            Exchange
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Exchange;
