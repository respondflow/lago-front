import { gql } from '@apollo/client'
import { memo } from 'react'

import { Typography } from '~/components/designSystem'
import { TExtendedRemainingFee } from '~/core/formats/formatInvoiceItemsMap'
import { intlFormatNumber } from '~/core/formats/intlFormatNumber'
import { deserializeAmount } from '~/core/serializers/serializeAmount'
import { CurrencyEnum } from '~/generated/graphql'
import { useInternationalization } from '~/hooks/core/useInternationalization'

gql`
  fragment FeeForInvoiceDetailsTableBodyLinePercentage on Fee {
    id
    units
    amountCents
    appliedTaxes {
      id
      taxRate
    }
    amountDetails {
      fixedFeeTotalAmount
      fixedFeeUnitAmount
      freeEvents
      freeUnits
      minMaxAdjustmentTotalAmount
      paidEvents
      paidUnits
      perUnitTotalAmount
      rate
      units
    }
  }
`

type InvoiceDetailsTableBodyLinePercentageProps = {
  currency: CurrencyEnum
  fee: TExtendedRemainingFee | undefined
}

export const InvoiceDetailsTableBodyLinePercentage = memo(
  ({ currency, fee }: InvoiceDetailsTableBodyLinePercentageProps) => {
    const { translate } = useInternationalization()
    const {
      freeEvents,
      freeUnits,
      paidUnits,
      rate,
      perUnitTotalAmount,
      fixedFeeUnitAmount,
      paidEvents,
      minMaxAdjustmentTotalAmount,
    } = fee?.amountDetails || {}

    return (
      <>
        {Number(freeUnits || 0) > 0 && (
          <tr className="details-line">
            <td>
              <Typography variant="body" color="grey600">
                {translate(
                  'text_659e67cd63512ef532843046',
                  {
                    freeEvents: Number(freeEvents || 0),
                  },
                  Number(freeEvents || 0),
                )}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {Number(freeUnits || 1)}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(0, {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {fee?.appliedTaxes?.length
                  ? fee?.appliedTaxes.map((appliedTaxes) => (
                      <Typography
                        key={`fee-${fee?.id}-applied-taxe-${appliedTaxes.id}`}
                        variant="body"
                        color="grey600"
                      >
                        {intlFormatNumber(appliedTaxes.taxRate / 100 || 0, {
                          maximumFractionDigits: 2,
                          style: 'percent',
                        })}
                      </Typography>
                    ))
                  : '0%'}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(0, {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
          </tr>
        )}

        <tr className="details-line">
          <td>
            <Typography variant="body" color="grey600">
              {translate('text_659e67cd63512ef53284306e')}
            </Typography>
          </td>
          <td>
            <Typography variant="body" color="grey600">
              {Number(paidUnits || 1)}
            </Typography>
          </td>
          <td>
            <Typography variant="body" color="grey600">
              {intlFormatNumber(Number(rate || 0) / 100 || 0, {
                maximumFractionDigits: 2,
                style: 'percent',
              })}
            </Typography>
          </td>
          <td>
            <Typography variant="body" color="grey600">
              {fee?.appliedTaxes?.length
                ? fee?.appliedTaxes.map((appliedTaxes) => (
                    <Typography
                      key={`fee-${fee?.id}-applied-taxe-${appliedTaxes.id}`}
                      variant="body"
                      color="grey600"
                    >
                      {intlFormatNumber(appliedTaxes.taxRate / 100 || 0, {
                        maximumFractionDigits: 2,
                        style: 'percent',
                      })}
                    </Typography>
                  ))
                : '0%'}
            </Typography>
          </td>
          <td>
            <Typography variant="body" color="grey600">
              {intlFormatNumber(deserializeAmount(Number(perUnitTotalAmount || 0), currency), {
                currencyDisplay: 'symbol',
                currency,
              })}
            </Typography>
          </td>
        </tr>

        {Number(fixedFeeUnitAmount || 0) > 0 && (
          <tr className="details-line">
            <td>
              <Typography variant="body" color="grey600">
                {translate('text_659e67cd63512ef53284308f')}
                {freeEvents}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {paidEvents || 1}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(Number(fixedFeeUnitAmount || 0), {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {fee?.appliedTaxes?.length
                  ? fee?.appliedTaxes.map((appliedTaxes) => (
                      <Typography
                        key={`fee-${fee?.id}-applied-taxe-${appliedTaxes.id}`}
                        variant="body"
                        color="grey600"
                      >
                        {intlFormatNumber(appliedTaxes.taxRate / 100 || 0, {
                          maximumFractionDigits: 2,
                          style: 'percent',
                        })}
                      </Typography>
                    ))
                  : '0%'}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(Number(fixedFeeUnitAmount || 0), {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
          </tr>
        )}

        {Number(minMaxAdjustmentTotalAmount || 0) !== 0 && (
          <tr className="details-line">
            <td>
              <Typography variant="body" color="grey600">
                {translate('text_659e67cd63512ef5328430ad')}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                1
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(Number(minMaxAdjustmentTotalAmount || 0), {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {fee?.appliedTaxes?.length
                  ? fee?.appliedTaxes.map((appliedTaxes) => (
                      <Typography
                        key={`fee-${fee?.id}-applied-taxe-${appliedTaxes.id}`}
                        variant="body"
                        color="grey600"
                      >
                        {intlFormatNumber(appliedTaxes.taxRate / 100 || 0, {
                          maximumFractionDigits: 2,
                          style: 'percent',
                        })}
                      </Typography>
                    ))
                  : '0%'}
              </Typography>
            </td>
            <td>
              <Typography variant="body" color="grey600">
                {intlFormatNumber(Number(minMaxAdjustmentTotalAmount || 0), {
                  currencyDisplay: 'symbol',
                  currency,
                })}
              </Typography>
            </td>
          </tr>
        )}
      </>
    )
  },
)

InvoiceDetailsTableBodyLinePercentage.displayName = 'InvoiceDetailsTableBodyLinePercentage'
