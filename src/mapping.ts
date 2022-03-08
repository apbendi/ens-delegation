import { DelegateChanged } from '../generated/ENS/ENS';
import { DelegateChangedEntity } from '../generated/schema';

export function handleDelegateChanged(event: DelegateChanged): void {
  const id = event.block.timestamp.toString() + '-' + event.logIndex.toString();
  let entity = DelegateChangedEntity.load(id);

  if (!entity) {
    entity = new DelegateChangedEntity(id);
  }

  entity.delegator = event.params.delegator;
  entity.fromDelegate = event.params.fromDelegate;
  entity.toDelegate = event.params.toDelegate;
  entity.timestamp = event.block.timestamp;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.from = event.transaction.from;

  entity.save();
}
