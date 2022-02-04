//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

contract Solidity08 {
    function test(uint256 x) external pure returns(uint256) {
        // with SafeMath
        // will revert

        require( x > 0, "will cause underflow" );
        unchecked { x--; }

        return x;
    }
}
