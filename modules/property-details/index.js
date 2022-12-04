/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
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

  const month = new Date(account.originalPurchasePriceDate).toLocaleString('default', { month: 'long' })
  const year = new Date(account.originalPurchasePriceDate).toLocaleString('default', { year: 'numeric' })

  const sincePurchase = (recentValuation, originalPurchasePrice) => {
    return recentValuation - originalPurchasePrice
  }
  const sincePurchaseAmount = sincePurchase(account.recentValuation.amount, account.originalPurchasePrice)

  const sincePurchasePercentage = (sincePurchase, originalPurchasePrice) => {
    return (sincePurchase / originalPurchasePrice) * 100
  }
  const sincePurchasePercentageAmount = sincePurchasePercentage(sincePurchaseAmount, account.originalPurchasePrice)

  const numberOfYearsSincePurchase = (originalPurchasePriceDate) => {
    // grab year from originalPurchasePriceDate string
    // deduct that year from current year using date object
  }

  const annualAppreciation = (sincePurchasePercentage, numberOfYearsSincePurchase) => {

  }

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
        <AccountLabel>Property details</AccountLabel>
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
            <AccountListItem><InfoText>Since purchase £{ sincePurchaseAmount.toLocaleString("en-US") } ({ sincePurchasePercentageAmount })%</InfoText></AccountListItem>
            <AccountListItem><InfoText>Annual Appreciation { annualAppreciation() }%</InfoText></AccountListItem>
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
