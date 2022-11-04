import * as React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
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
  TextField,
  CircularProgress
} from '@mui/material';

import AxiosService from 'services/axios';
import Select, { components, OptionProps, ControlProps } from 'react-select';
import { useSocket } from 'providers/SocketProvider';
import { useAuth } from 'providers/AuthProvider';
import {
  SelectOptionType,
  NetworkType,
  networkOptions,
  coinOptions,
  CoinSelectOptionType,
  mergeTwoSortedArray2OneSorted
} from 'utils';

const data = [
  {
    name: 1667484411966,
    uv: 4000
  },
  {
    name: 1667484412066,
    uv: 5000
  },
  {
    name: 1667484412166,
    uv: 3000
  },
  {
    name: 1667484412266,
    uv: 6000
  }
];

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

  const [firstNetwork, setFirstNetwork] = React.useState<
    SelectOptionType<NetworkType>
  >(networkOptions[0]);
  const [firstCoin, setFirstCoin] = React.useState<CoinSelectOptionType>(
    coinOptions.ethereum[0]
  );
  const [secondNetwork, setSecondNetwork] = React.useState<
    SelectOptionType<NetworkType>
  >(networkOptions[0]);
  const [secondCoin, setSecondCoin] = React.useState<CoinSelectOptionType>(
    coinOptions.ethereum[0]
  );

  const [firstCoinPriceData, setFirstCoinPriceData] = React.useState<
    Array<[number, number]>
  >([]);

  const [secondCoinPriceData, setSecondCoinPriceData] = React.useState<
    Array<[number, number]>
  >([]);

  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    setFirstCoin(coinOptions[firstNetwork.value][0]);
  }, [firstNetwork]);

  React.useEffect(() => {
    setSecondCoin(coinOptions[secondNetwork.value][0]);
  }, [secondNetwork]);

  const handleDeposit = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (!socket.connected) return;

      socket.emit('deposit', { user_id: '', token_name: '', amount: 1 });
    },
    [socket]
  );

  React.useEffect(() => {
    setFirstCoinPriceData([]);
    AxiosService.getMarketChart(firstCoin.coin_id).then((res) => {
      setFirstCoinPriceData(res.prices);
    });
  }, [firstCoin]);

  React.useEffect(() => {
    setSecondCoinPriceData([]);
    AxiosService.getMarketChart(secondCoin.coin_id).then((res) => {
      setSecondCoinPriceData(res.prices);
    });
  }, [secondCoin]);

  const timeRange = React.useMemo(
    () =>
      mergeTwoSortedArray2OneSorted(
        firstCoinPriceData.map((_price) => _price[0]),
        secondCoinPriceData.map((_price) => _price[0])
      ),
    [firstCoinPriceData, secondCoinPriceData]
  );

  React.useEffect(() => {
    console.log(timeRange);
  }, [timeRange]);

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
            value={firstNetwork}
            onChange={(val) =>
              setFirstNetwork(val as SelectOptionType<NetworkType>)
            }
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
            value={firstCoin}
            onChange={(val) => setFirstCoin(val as CoinSelectOptionType)}
            options={coinOptions[firstNetwork.value]}
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
            InputProps={{ endAdornment: firstCoin.value.toUpperCase() }}
          />
        </Grid>
        {firstCoinPriceData.length > 0 && (
          <Grid item xs={12} height={500}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={firstCoinPriceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="0"
                  minTickGap={30}
                  tickFormatter={(_name) =>
                    new Date(_name).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'numeric'
                    })
                  }
                />
                <YAxis
                  domain={[
                    (dataMin) => Math.floor(dataMin * 50) / 50,
                    (dataMax) => Math.ceil(dataMax * 50) / 50
                  ]}
                />
                <Tooltip
                  itemStyle={{ color: '#19032d' }}
                  labelStyle={{ color: 'gray' }}
                  formatter={(_value, _name) => [`${_value} USD`, 'Price']}
                  labelFormatter={(_label) => new Date(_label).toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey="1"
                  stroke="#689f38"
                  fill="#689f38"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Typography sx={{ pb: 1 }} variant="h4">
            Choose Network
          </Typography>
          <Select
            value={secondNetwork}
            onChange={(val) =>
              setSecondNetwork(val as SelectOptionType<NetworkType>)
            }
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
            value={secondCoin}
            onChange={(val) => setSecondCoin(val as CoinSelectOptionType)}
            options={coinOptions[secondNetwork.value]}
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
            InputProps={{ endAdornment: secondCoin.value.toUpperCase() }}
          />
        </Grid>
        <Grid item xs={12} height={500}>
          {secondCoinPriceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={secondCoinPriceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="0"
                  minTickGap={30}
                  tickFormatter={(_name) =>
                    new Date(_name).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'numeric'
                    })
                  }
                />
                <YAxis
                  domain={[
                    (dataMin) => Math.floor(dataMin * 50) / 50,
                    (dataMax) => Math.ceil(dataMax * 50) / 50
                  ]}
                />
                <Tooltip
                  itemStyle={{ color: '#19032d' }}
                  labelStyle={{ color: 'gray' }}
                  formatter={(_value, _name) => [`${_value} USD`, 'Price']}
                  labelFormatter={(_label) => new Date(_label).toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey="1"
                  stroke="#689f38"
                  fill="#689f38"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <CircularProgress size={64} disableShrink thickness={3} />
            </Box>
          )}
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
