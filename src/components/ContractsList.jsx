import React from 'react';
// import { contracts } from '../config/contracts';
import { PageContainer } from './common/PageContainer';
import { BackButton } from './common/BackButton';
import { ContractCard } from './common/ContractCard';

export const ContractsList = ({ theme }) => {
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  // Przykładowe kontrakty (możesz dodać więcej lub pobierać z innego źródła)
  const contracts = [
    {
      name: "SimpleStorage",
      description: "Minimal contract for storing a single integer value.",
    },
    {
      name: "ClickCounter",
      description: "Counts the number of clicks by users.",
    },
    {
      name: "MessageBoard",
      description: "Allows users to post and read messages.",
    },
    {
      name: "SimpleVoting",
      description: "Simple voting contract for demonstration purposes.",
    },
  ];

  return (
    <PageContainer
      theme={theme}
      title="Available Contracts"
      maxWidth={900}
      backButton={
        <BackButton theme={theme} to="/my-deployments">
          Go to My Deployments
        </BackButton>
      }
    >
      <div style={{ 
        fontSize: '0.95em', 
        color: theme.textPrimary, 
        fontFamily: 'Inter, Arial, sans-serif', 
        fontWeight: 500, 
        textAlign: 'left', 
        marginBottom: 28 
      }}>
        Choose a contract to view details.
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '18px' 
      }}>
        {contracts.map((contract) => (
          <ContractCard
            key={contract.name}
            theme={theme}
            to={`/contract/${toKebabCase(contract.name)}`}
            title={contract.name}
            description={contract.description}
          />
        ))}
      </div>
    </PageContainer>
  );
};
