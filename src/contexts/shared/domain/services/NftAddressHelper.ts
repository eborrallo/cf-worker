import config from '../../infrastructure/config'
import { ethers } from 'ethers'
import { AddressFinder, NETWORK } from '../../../Unlockd/Blokchain/domain/Mappers/AddressMapper'

export const wrapIfIsExistWrappedVersion = collection => {
  const wraps = AddressFinder.wraps()
  const address = wraps[collection.toLowerCase()] ?? collection
  return ethers.utils.getAddress(address)
}

export const unwrapIfIsWrappedVersion = collection => {
  //Always value of the wrap object should be as lower case PLEASE MFR
  const wraps = AddressFinder.wraps()

  const values = Object.values(wraps)
  if (values.includes(collection.toLowerCase())) {
    const index = values.indexOf(collection.toLowerCase())
    const keys = Object.keys(wraps)
    return keys[index]
  }
  return collection
}

export const getNFTAddressForMainnet = (_address: string) => {
  if (config.get('ethers.network') === NETWORK.MAINNET.toString()) {
    return _address
  }
  const address = wrapIfIsExistWrappedVersion(_address)
  const mainnetAddresses = AddressFinder.collections(NETWORK.MAINNET)
  switch (address.toLowerCase()) {
    case AddressFinder.collections().punks.toLowerCase():
      return mainnetAddresses.punks
    case AddressFinder.collections().bayc.toLowerCase():
      return mainnetAddresses.bayc
    case AddressFinder.collections().mfer.toLowerCase():
      return mainnetAddresses.mfer
    case AddressFinder.collections().pugy_penguins.toLowerCase():
      return mainnetAddresses.pugy_penguins
    default:
      return address
  }
}
