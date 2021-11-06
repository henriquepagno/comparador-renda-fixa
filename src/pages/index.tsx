import type { NextPage } from 'next';
import { IoIosAdd } from 'react-icons/io';

import { ICalculatedData } from '../common/interfaces/calculated-data';

import api from '../services/api';

import { useThirdParty } from '../hookStore/ThirdParty';
import { useInformation } from '../hookStore/Information';
import { useChart } from '../hookStore/Chart';
import { useModal } from '../hookStore/Modal';

import ThirdPartyData from '../components/ThirdPartyData';
import ConfigurationAmount from '../components/ConfigurationAmount';
import ConfigurationMonths from '../components/ConfigurationMonths';
import Button from '../components/Button';
import Chart from '../components/Chart';

import styles from '../styles/pages/Home.module.scss';
import { IInvestmentOption } from '../common/interfaces/investment-option';
import InvestmentCard from '../components/InvestmentCard';

const Home: NextPage = () => {
  const { yearlyIpca, yearlySelic } = useThirdParty();
  const {
    months,
    amountInvested,
    investmentOptions,
    storeInvestmentResults,
    removeInvestmentOption,
    hightlightInvestmentOption,
    unhightlightInvestmentOption,
  } = useInformation();
  const { storeLoading, storeChartData } = useChart();
  const { storeInvestmentOptionModalVisible } = useModal();

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

  const requestData = {
    yearlyIpca,
    yearlySelic,
    amountInvested,
    monthsDuration: months,
    options: options,
  };

  async function getCalculateData(): Promise<void> {
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

  return (
    <>
      <div className={styles['configuration']}>
        <ThirdPartyData />

        <ConfigurationMonths />
        <ConfigurationAmount />

        <Button
          className={
            investmentOptions.length === 0
              ? styles['add-button-animation']
              : undefined
          }
          label="Adicionar"
          onClick={() => {
            storeInvestmentOptionModalVisible(true);
          }}
          type="secondary"
          icon={<IoIosAdd />}
        />

        <Button label="Calcular" onClick={getCalculateData} type="primary" />

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

      <Chart />
    </>
  );
};

export default Home;
