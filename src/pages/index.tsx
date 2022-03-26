import type { NextPage } from 'next';
import { IoIosAdd } from 'react-icons/io';
import { BsGraphUp } from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';

import { ICalculatedData } from '../common/interfaces/calculated-data';
import { IInvestmentOption } from '../common/interfaces/investment-option';

import api from '../services/api';

import { useThirdParty } from '../hookStore/ThirdParty';
import { useInformation } from '../hookStore/Information';
import { useChart } from '../hookStore/Chart';
import { useModal } from '../hookStore/Modal';
import { useToast } from '../hookStore/Toast';

import ThirdPartyData from '../components/ThirdPartyData';
import ConfigurationAmount from '../components/ConfigurationAmount';
import ConfigurationMonths from '../components/ConfigurationMonths';
import Button from '../components/Button';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import InvestmentCard from '../components/InvestmentCard';
import Switch from '../components/Switch';

import styles from '../styles/pages/Home.module.scss';
import { GraphType } from '../common/enums/GraphType';

const Home: NextPage = () => {
  const { yearlyIpca, yearlyDi } = useThirdParty();
  const {
    months,
    amountInvested,
    investmentOptions,
    storeInvestmentResults,
    removeInvestmentOption,
    hightlightInvestmentOption,
    unhightlightInvestmentOption,
  } = useInformation();
  const { storeLoading, storeChartData, graphType, storeGraphType, chartData } =
    useChart();
  const { storeInvestmentOptionModalVisible } = useModal();
  const { addToast } = useToast();

  const options = investmentOptions.map(function (
    investment: IInvestmentOption
  ) {
    return {
      id: investment.id,
      investmentCategory: investment.category,
      interestType: investment.type,
      interest: investment.interest,
    };
  });

  // const requestData = useMemo(
  //   () => ({
  //     yearlyIpca,
  //     yearlyDi,
  //     amountInvested,
  //     monthsDuration: months,
  //     options: options,
  //     type: graphType === GraphType.Line ? 'line' : 'bar',
  //   }),
  //   [amountInvested, graphType, months, options, yearlyDi, yearlyIpca]
  // );

  async function getCalculateData(graphType: 'bar' | 'line'): Promise<void> {
    const requestData = {
      yearlyIpca,
      yearlyDi,
      amountInvested,
      monthsDuration: months,
      options: options,
      type: graphType,
    };

    storeLoading(true);

    const result = await api.post<ICalculatedData>('calculated-data/', {
      ...requestData,
    });

    const { data: resultData } = result.data;

    if (resultData?.chartData) storeChartData(resultData.chartData);
    if (resultData?.calculatedOptions)
      storeInvestmentResults(resultData.calculatedOptions);

    storeLoading(false);
  }

  const handleGraphTypeSwitch = async (checked: boolean): Promise<void> => {
    let graphType: 'bar' | 'line';
    if (checked) {
      storeGraphType(GraphType.Bar);
      graphType = 'bar';
    } else {
      storeGraphType(GraphType.Line);
      graphType = 'line';
    }

    if (chartData.length > 0) {
      await getCalculateData(graphType);
    }
  };

  return (
    <>
      <div className={styles['configuration']}>
        <ThirdPartyData />

        <ConfigurationMonths />
        <ConfigurationAmount />

        <Button
          className={
            investmentOptions.length === 0 ? styles['add-button-animation'] : ''
          }
          label="Adicionar"
          onClick={() => {
            if (investmentOptions.length === 6) {
              addToast({
                title: 'Não permitido.',
                description:
                  'Não é possível adicionar mais de seis tipos de investimento.',
                type: 'info',
              });
            } else {
              storeInvestmentOptionModalVisible(true);
            }
          }}
          type="secondary"
          icon={<IoIosAdd />}
          disabled={investmentOptions.length === 6}
        />

        <Button
          label="Calcular"
          onClick={() => {
            getCalculateData(graphType === GraphType.Line ? 'line' : 'bar');
          }}
          type="primary"
        />

        {investmentOptions.map((investment) => {
          return (
            <InvestmentCard
              key={investment.id}
              id={investment.id}
              category={investment.category}
              type={investment.type}
              interest={investment.interest}
              color={investment.color}
              grossYield={investment.grossYield}
              netYield={investment.netYield}
              ranking={investment.ranking}
              onRemove={() => {
                removeInvestmentOption(investment.id);
              }}
              onMouseOverFunction={() => {
                hightlightInvestmentOption(investment.id);
              }}
              onMouseLeaveFunction={() => {
                unhightlightInvestmentOption();
              }}
            />
          );
        })}
      </div>

      <div className={styles['graph']}>
        <div className={styles['graph-config']}>
          <Switch
            uncheckedIcon={<GoGraph size={16} />}
            checkedIcon={<BsGraphUp size={16} />}
            handleSwitchClick={handleGraphTypeSwitch}
          />
        </div>

        {graphType === GraphType.Line ? <LineChart /> : <BarChart />}
      </div>
    </>
  );
};

export default Home;
