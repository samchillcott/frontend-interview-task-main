/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountListItemRow, AccountSection, InfoText, InfoTextGreen, Inset
} from "./style";


const account = {
  uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
  deleted: false,
  dateCreated: "2020-12-03T08:55:33.421Z",
  currency: "GBP",
  name: "15 Temple Way",
  bankName: "Residential",
  type: "properties",
  subType: "residential",
  originalPurchasePrice: 250000,
  originalPurchasePriceDate: "2017-09-03",
  recentValuation: { amount: 310000, status: "good" },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-01T08:55:33.421Z",
  updateAfterDays: 30,
};

const Detail = ({ }) => {
  let mortgage;
  const lastUpdate = new Date(account.lastUpdate);
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }

  const dateObject = new Date(account.originalPurchasePriceDate)
  const month = dateObject.toLocaleString('default', { month: 'long' })
  const year = dateObject.toLocaleString('default', { year: 'numeric' })

  const sincePurchase = (recentValuation, originalPurchasePrice) => {
    return recentValuation - originalPurchasePrice
  }
  const sincePurchaseAmount = sincePurchase(account.recentValuation.amount, account.originalPurchasePrice)

  const sincePurchasePercentage = (sincePurchase, originalPurchasePrice) => {
    return (sincePurchase / originalPurchasePrice) * 100
  }
  const sincePurchasePercentageAmount = sincePurchasePercentage(sincePurchaseAmount, account.originalPurchasePrice)

  const numberOfYearsSincePurchase = (date) => {
    const currentYear = new Date().getFullYear()
    const purchaseYear = date.getFullYear()
    return currentYear - purchaseYear
  }
  const numberOfYearsSincePurchaseAmount = numberOfYearsSincePurchase(dateObject)

  const annualAppreciation = (sincePurchasePercentage, numberOfYearsSincePurchase) => {
    return sincePurchasePercentage / numberOfYearsSincePurchase
  }
  const annualAppreciationAmount = annualAppreciation(sincePurchasePercentageAmount, numberOfYearsSincePurchaseAmount)

  return (
    <Inset>
      <AccountSection>
        <AccountLabel>Estimated Value</AccountLabel>
        <AccountHeadline>
          { new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(account.recentValuation.amount) }
        </AccountHeadline>
        <AccountList>
          <AccountListItem><InfoText>
            { `Last updated ${format(lastUpdate, "do MMM yyyy")}` }
          </InfoText></AccountListItem>
          <AccountListItem><InfoText>
            { `Next update ${format(
              add(lastUpdate, { days: account.updateAfterDays }),
              "do MMM yyyy"
            )}` }
          </InfoText></AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property Details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>{ account.name }</InfoText></AccountListItem>
            <AccountListItem><InfoText>{ account.bankName }</InfoText></AccountListItem>
            <AccountListItem><InfoText>{ account.postcode }</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Valuation Change</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>Puchased for <strong>£{ account.originalPurchasePrice.toLocaleString("en-US") } </strong>in { month } { year }</InfoText></AccountListItem>
            <AccountListItem>
              <AccountListItemRow>
                <InfoText>Since purchase </InfoText>
                <InfoTextGreen>£{ sincePurchaseAmount.toLocaleString("en-US") } ({ sincePurchasePercentageAmount })%</InfoTextGreen>
              </AccountListItemRow>
            </AccountListItem>
            <AccountListItemRow>
                <InfoText>Annual Appreciation </InfoText>
              <InfoTextGreen>{ annualAppreciationAmount }%</InfoTextGreen>
            </AccountListItemRow>
          </AccountList>
        </RowContainer>
      </AccountSection>
      { mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={ () => alert("You have navigated to the mortgage page") }
          >
            <AccountList>
              <AccountListItem><InfoText>
                { new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(account.associatedMortgages[0].currentBalance)
                ) }
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{ account.associatedMortgages[0].name }</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      ) }
      <Button
        // This is a dummy action
        onClick={ () => alert("You have navigated to the edit account page") }
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default Detail;
