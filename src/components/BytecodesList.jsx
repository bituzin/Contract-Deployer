import React from 'react';
import { contracts } from '../config/contracts';
import { PageContainer } from './common/PageContainer';
import { BackButton } from './common/BackButton';
import { ContractCard } from './common/ContractCard';

export const BytecodesList = ({ theme }) => {
  const toKebabCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  };

  return (
    <PageContainer
      theme={theme}
      title="Bytecodes"
      maxWidth={900}
      backButton={
        <BackButton theme={theme} to="/contracts">
          Go to Contracts
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
        Choose a contract to view its bytecode.
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
            to={`/bytecode/${toKebabCase(contract.name)}`}
            title={contract.name}
            description={contract.description}
          />
        ))}
      </div>
    </PageContainer>
  );
};
